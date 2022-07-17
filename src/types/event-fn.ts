/**
 * Callback function triggered when channel has a new event.
 * @param event - one of ['loaded', 'error']
 * @param params - object with event data
 */
type EventFn = (event: string, params: any) => void;

export type { EventFn };