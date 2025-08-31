export class Event {
  constructor(
    readonly eventId: string,
    readonly description: string,
    readonly eventPriceInCents: number
  ) {}
}
