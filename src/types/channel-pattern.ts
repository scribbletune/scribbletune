
type ChannelPattern = {
    /**
     * Channel index to apply the playing pattern.
     * If no index (`idx`) is given at the creation of the Channel, it's a number, starting with 0.
     * If index is given manually, several channels can have the same index, to be played simultaneously.
     *  - Example:  `0`
     *  - Example:  `1`
     *  - Example:  `'beat'`
     *  - Example:  `'synth'`
     */
    channelIdx: string;
    /**
     * The song structure for one channel, saying which clip to play at each step,
     * Only the 10 first clips of each channel are available through this pattern.
     * Those numbered by a single char between 0 and 9.
     * `'-'` means 'silence for 1 step'.
     * `'_'` means 'extend the last clip by 1 step'.
     * If index is given manually, several channels can have the same index, to be played simultaneously.
     *  - Contains: `0123456789_-`
     *  - Example:  `'0___1___----'`
     */
    pattern: string;
};

export type { ChannelPattern };