import * as React from 'react';
import {
    ColumnDef,
    ColumnPinningState,
    SortingState,
    VisibilityState,
    RowSelectionState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { PAGINATION_META_DATA } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataTableProps<TData, TValue = unknown> = {
    /** Column definitions created with `ColumnDef` from @tanstack/react-table */
    readonly columns: ColumnDef<TData, TValue>[];
    /** Row data for the current page */
    readonly data: TData[];
    /** Pagination metadata returned by the server */
    readonly meta?: PAGINATION_META_DATA;
    /** Shows skeleton rows while data is being fetched */
    readonly isLoading?: boolean;

    // ── Server-side pagination ────────────────────────────────────────────────
    /** Current 1-based page number */
    readonly page?: number;
    /** Number of rows per page */
    readonly pageSize?: number;
    /** Called whenever the page or page size changes */
    readonly onPaginationChange?: (page: number, pageSize: number) => void;

    // ── Server-side sorting ───────────────────────────────────────────────────
    /** Called with the column id and direction when the user clicks a sortable header */
    readonly onSortingChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
    /** Initial sort column id (reflects the default sort visually on first render) */
    readonly defaultSortBy?: string;
    /** Initial sort direction */
    readonly defaultSortDirection?: 'asc' | 'desc';

    // ── Search ────────────────────────────────────────────────────────────────
    /** Placeholder text for the search input. Supplying this prop shows the input. */
    readonly searchPlaceholder?: string;
    /** Controlled value for the search input */
    readonly searchValue?: string;
    /** Called on every keystroke in the search input */
    readonly onSearchChange?: (value: string) => void;

    // ── Extra toolbar content ─────────────────────────────────────────────────
    /** Renders to the right of the search input (e.g. an "Add" button) */
    readonly toolbar?: React.ReactNode;
    /** Column ids to pin. e.g. { right: ['actions'] } */
    readonly pinnedColumns?: { left?: string[]; right?: string[] };
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50] as const;
const SKELETON_ROW_COUNT = 5;

// ─── Sortable header helper ───────────────────────────────────────────────────

/**
 * Creates a sortable column header button.
 *
 * Usage inside a `ColumnDef`:
 * ```ts
 * header: ({ column }) => <SortableHeader column={column} title="Email" />
 * ```
 */
interface SortableHeaderProps {
    readonly column: {
        getIsSorted: () => false | 'asc' | 'desc';
        toggleSorting: (desc?: boolean) => void;
    };
    readonly title: string;
}

function getSortIcon(sorted: false | 'asc' | 'desc') {
    if (sorted === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />;
    if (sorted === 'desc') return <ArrowDown className="ml-2 h-4 w-4" />;
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
}

export function SortableHeader({ column, title }: SortableHeaderProps) {
    const sorted = column.getIsSorted();
    return (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(sorted === 'asc')}
        >
            {title}
            {getSortIcon(sorted)}
        </Button>
    );
}

// ─── Body renderer (extracted to avoid nested ternaries) ────────────────────

function renderSkeletonRows(columnCount: number) {
    return Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
        <TableRow key={`skel-row-${i}`}>
            {Array.from({ length: columnCount }, (__, j) => (
                <TableCell key={`skel-cell-${i}-${j}`}>
                    <Skeleton className="h-5 w-full" />
                </TableCell>
            ))}
        </TableRow>
    ));
}

function renderDataRows<TData>(rows: ReturnType<ReturnType<typeof useReactTable<TData>>['getRowModel']>['rows']) {
    return rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
            {row.getVisibleCells().map((cell) => {
                const pinned = cell.column.getIsPinned();
                return (
                    <TableCell
                        key={cell.id}
                        className={pinned ? 'bg-background' : undefined}
                        style={pinned ? {
                            position: 'sticky',
                            right: pinned === 'right' ? `${cell.column.getAfter('right')}px` : undefined,
                            left: pinned === 'left' ? `${cell.column.getAfter('left')}px` : undefined,
                            zIndex: 1,
                            boxShadow: pinned === 'right' ? '-1px 0 0 hsl(var(--border))' : '1px 0 0 hsl(var(--border))',
                        } : undefined}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                );
            })}
        </TableRow>
    ));
}

function renderEmptyRow(columnCount: number) {
    return (
        <TableRow>
            <TableCell colSpan={columnCount} className="h-24 text-center text-muted-foreground">
                No results found.
            </TableCell>
        </TableRow>
    );
}

function renderTableBody<TData>(
    table: ReturnType<typeof useReactTable<TData>>,
    columns: ColumnDef<TData>[],
    isLoading: boolean,
) {
    if (isLoading) return renderSkeletonRows(columns.length);
    const rows = table.getRowModel().rows;
    if (rows.length > 0) return renderDataRows(rows);
    return renderEmptyRow(columns.length);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData, TValue = unknown>({
    columns,
    data,
    meta,
    isLoading = false,
    page = 1,
    pageSize = 10,
    onPaginationChange,
    onSortingChange,
    defaultSortBy,
    defaultSortDirection,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    toolbar,
    pinnedColumns,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>(
        defaultSortBy ? [{ id: defaultSortBy, desc: defaultSortDirection === 'desc' }] : []
    );
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [columnPinning] = React.useState<ColumnPinningState>(pinnedColumns ?? {});

    const pageCount = meta?.lastPage ?? -1;

    const table = useReactTable({
        data,
        columns,
        pageCount,
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnPinning,
            pagination: {
                pageIndex: page - 1, // TanStack Table is 0-based
                pageSize,
            },
        },
        onSortingChange: (updater) => {
            const next = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(next);
            if (next.length > 0 && onSortingChange) {
                onSortingChange(next[0].id, next[0].desc ? 'desc' : 'asc');
            } else if (next.length === 0 && onSortingChange) {
                // Sorting cleared — caller can reset to default order
                onSortingChange('', 'asc');
            }
        },
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    const canPrev = page > 1;
    const canNext = page < (meta?.lastPage ?? 1);

    return (
        <div className="space-y-4">
            {/* ── Toolbar ─────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: search */}
                <div className="flex flex-1 items-center gap-2">
                    {onSearchChange !== undefined && (
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="max-w-xs"
                        />
                    )}
                </div>

                {/* Right: custom toolbar + column visibility */}
                <div className="flex items-center gap-2">
                    {toolbar}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            col.toggleVisibility(!!value)
                                        }
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* ── Table ───────────────────────────────────────────────────── */}
            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                const pinned = header.column.getIsPinned();
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={pinned ? 'bg-background' : undefined}
                                        style={pinned ? {
                                            position: 'sticky',
                                            right: pinned === 'right' ? `${header.column.getAfter('right')}px` : undefined,
                                            left: pinned === 'left' ? `${header.column.getAfter('left')}px` : undefined,
                                            zIndex: 2,
                                            boxShadow: pinned === 'right' ? '-1px 0 0 hsl(var(--border))' : '1px 0 0 hsl(var(--border))',
                                        } : undefined}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {renderTableBody(table, columns, isLoading)}
                    </TableBody>
                </Table>
            </div>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Row selection count */}
                <p className="text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {meta?.total ?? data.length} row(s) selected.
                </p>

                {/* Pagination controls */}
                {onPaginationChange && (
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Rows per page */}
                        <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap text-sm text-muted-foreground">
                                Rows per page
                            </span>
                            <Select
                                value={String(pageSize)}
                                onValueChange={(val) => onPaginationChange(1, Number(val))}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAGE_SIZE_OPTIONS.map((s) => (
                                        <SelectItem key={s} value={String(s)}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Page info */}
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                            Page {page} of {meta?.lastPage ?? 1}
                        </span>

                        {/* Navigation buttons */}
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPaginationChange(1, pageSize)}
                                disabled={!canPrev || isLoading}
                                aria-label="First page"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPaginationChange(page - 1, pageSize)}
                                disabled={!canPrev || isLoading}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPaginationChange(page + 1, pageSize)}
                                disabled={!canNext || isLoading}
                                aria-label="Next page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                    onPaginationChange(meta?.lastPage ?? 1, pageSize)
                                }
                                disabled={!canNext || isLoading}
                                aria-label="Last page"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
