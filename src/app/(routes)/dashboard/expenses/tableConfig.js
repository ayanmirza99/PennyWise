export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name") || "-"}</div>,
  },
  {
    accessorKey: "expense",
    header: "Amount Spent",
    cell: ({ row }) => <div>{row.getValue("expense") || "-"}</div>,
  },
  {
    accessorKey: "budget",
    header: "Spent On",
    cell: ({ row }) => (
      <div>
        {row.original.Icon} {row.original.budgetName || "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      return (
        <div>
          {createdAt
            ? `${new Date(createdAt).toLocaleDateString()} at ${new Date(createdAt).toLocaleTimeString()}`
            : "-"}
        </div>
      );
    },
  },
];
