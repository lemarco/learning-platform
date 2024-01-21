import kanbanBoards from "../../../data/kanban.json";
import type { KanbanBoard } from "../../../types/kanban";
import KanbanPageContent from "./content";

export interface KanbanPageData {
  kanbanBoards: KanbanBoard[];
}

async function getData() {
  return { kanbanBoards } as KanbanPageData;
}

export default async function KanbanPage() {
  return <KanbanPageContent {...(await getData())} />;
}
