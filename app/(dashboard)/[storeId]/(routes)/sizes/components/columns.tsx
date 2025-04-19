"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  created_at: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
