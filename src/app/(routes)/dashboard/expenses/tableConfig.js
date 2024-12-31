export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    className: "w-48",
    cell: ({ row }) => <div>{row.original.name || "-"}</div>,
  },
  {
    accessorKey: "expense",
    header: "Amount Spent",
  },
  {
    accessorKey: "budget",
    header: "Spent On",
    cell: ({ row }) => (
      <div>{row.original.Icon + " " + row.original.budgetName || "-"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      console.log(row.original.createdAt);
      return (
        <div>
          {row.original.createdAt.toLocaleDateString() +
            " at " +
            row.original.createdAt.toLocaleTimeString() || "-"}
        </div>
      );
    },
  },
];
