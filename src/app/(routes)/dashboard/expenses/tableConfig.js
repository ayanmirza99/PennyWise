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
            ? `${new Date(createdAt).toLocaleDateString()} at ${new Date(
                createdAt
              ).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      return (
        <div>
          {updatedAt
            ? `${new Date(updatedAt).toLocaleDateString()} at ${new Date(
                updatedAt
              ).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "-"}
        </div>
      );
    },
  },
];
