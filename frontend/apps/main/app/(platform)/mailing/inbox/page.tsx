import inboxMessages from "../../../../data/mailing/inbox.json";
import type { MailingInboxMessage } from "../../../../types/mailing/inbox";
import MailingInboxPageContent from "./content";

export interface MailingInboxPageData {
  inboxMessages: MailingInboxMessage[];
}

async function getData() {
  return { inboxMessages } as MailingInboxPageData;
}

export default async function UsersListPage() {
  return <MailingInboxPageContent {...(await getData())} />;
}
