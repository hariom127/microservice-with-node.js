import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ms_ticking/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
