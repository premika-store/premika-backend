"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  created_at: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({row}) => {

      return (
        <div className="flex items-center gap-x-2">
          {row.original.value}
          <div className="size-6 rounded-full border" style={{backgroundColor: row.original.value}} />
        </div>
      )
    }
    
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
