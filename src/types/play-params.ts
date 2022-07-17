import type { ChannelPattern } from "./channel-pattern";

interface PlayParams {
    /**
     * An array of ChannelPattern
     */
    channelPatterns: ChannelPattern[];
    /**
     * The time duration to play each clip in the patterns. Default is 4 bars.
     *  - Default: `'4:0:0'`
     *  - Example: `'1:0:0'`
     *  - See: https://github.com/Tonejs/Tone.js/wiki/Time#transport-time
     */
    clipDuration?: string;
}

export type { PlayParams };