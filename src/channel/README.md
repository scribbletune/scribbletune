# channel/

This folder contains modules extracted from the `Channel` class to keep each unit focused on a single responsibility. The `Channel` class in `../channel.ts` acts as a slim orchestrator that delegates to these modules.

## Modules

### instrument-factory.ts

Owns the instrument lifecycle — creation, load-detection, and context migration.

- **`checkToneObjLoaded(toneObject, resolve)`** — Recursively inspects a Tone.js object's internal buffers (`_buffer`, `_buffers`) to determine if it's loaded. If not, it attaches to the `onload` callback. This is a brittle but necessary hack for handling async loading of externally-provided Tone instruments.

- **`recreateToneObjectInContext(toneObject, context)`** — Clones a Tone.js instrument (Player, PolySynth, Sampler, or generic) into a different audio context while preserving its settings. Returns a promise that resolves with the new instrument once loaded.

- **`createInstrument(context, params, channelMeta)`** — Main entry point. Given channel params, it synchronously creates the appropriate instrument type (synth, player, sampler, external, etc.) and returns:
  - `instrument` — available immediately (synchronously) for sequence setup
  - `external` — optional external output interface
  - `initPromise` — resolves with the final (possibly re-contextualized, volume-adjusted) instrument

### effects-chain.ts

Owns effects initialization.

- **`initEffects(instrument, context, params)`** — Creates each effect (by name string or from an existing Tone node), re-contextualizes if needed, starts it, then chains everything to the audio destination via `instrument.chain(...effects).toDestination()`. Rejects effects on external outputs.

### sequence-builder.ts

Owns the playback callback that Tone.js calls on each sequence step.

- **`SequenceHost`** — Interface describing the mutable state the callback needs (`instrument`, `external`, `hasLoaded`, `clipNoteCount`). The `Channel` class satisfies this interface, so it passes `this` directly.

- **`buildSequenceCallback(params, host, playerCb, eventCb)`** — Returns a `SeqFn` that branches on instrument type:
  - **External** — routes through the custom `triggerAttackRelease` interface
  - **Player** — calls `.start(time)` (no note/duration)
  - **PolySynth / Sampler** — passes notes (including chords) and duration
  - **NoiseSynth** — passes duration only (no note parameter)
  - **Generic** — single note + duration fallback

## How Channel uses these

```typescript
// In the Channel constructor:
const result = createInstrument(context, params, { idx, name });
this.instrument = result.instrument;    // available synchronously
this.external = result.external;
this.initializerTask = result.initPromise
  .then(finalInstrument => {
    this.instrument = finalInstrument;  // may have been re-contextualized
    return initEffects(this.instrument, context, params);
  });

// In getSeqFn:
return buildSequenceCallback(params, this, playerCb, eventCb);
```
