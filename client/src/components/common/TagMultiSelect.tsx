import React, { useState } from 'react';
import { Check, ChevronsUpDown, X, Loader2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useTagsQuery, useCreateTag } from '@/hooks/useTags';
import { toast } from '@/hooks/use-toast';

interface TagMultiSelectProps {
  /** Array of selected tag IDs */
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({
  value,
  onChange,
  placeholder = 'Select tags...',
  disabled = false,
}) => {
  const { data: tags, isLoading: tagsLoading } = useTagsQuery();
  const createTag = useCreateTag();

  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6366f1');

  const toggleTag = (tagId: string) => {
    const next = value.includes(tagId)
      ? value.filter(id => id !== tagId)
      : [...value, tagId];
    onChange(next);
  };

  const handleCreateTag = () => {
    const name = newTagName.trim();
    if (!name) return;

    createTag.mutate({ name, color: newTagColor }, {
      onSuccess: (created) => {
        onChange([...value, created?.data?.id]);
        setNewTagName('');
        setNewTagColor('#6366f1');
        toast({ title: `Tag "${created?.data?.name}" created` });
      },
      onError: (error) => {
        toast({ title: 'Failed to create tag', description: error.message, variant: 'destructive' });
      },
    });
  };

  const tagPlural = value.length === 1 ? 'tag' : 'tags';
  const triggerLabel = value.length === 0
    ? placeholder
    : `${value.length} ${tagPlural} selected`;

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between font-normal"
          >
            {triggerLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="start"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
        >
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>
                {tagsLoading ? 'Loading...' : 'No tags found.'}
              </CommandEmpty>
              <CommandGroup>
                {tags?.data?.map(tag => {
                  const isSelected = value.includes(tag.id);
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={() => toggleTag(tag.id)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {tag.color && (
                          <span
                            className="h-3 w-3 rounded-full shrink-0"
                            style={{ backgroundColor: tag.color }}
                          />
                        )}
                        {tag.name}
                      </div>
                      <Check
                        className={`ml-auto h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              {/* Create new tag */}
              <div className="p-2 space-y-2">
                <p className="text-xs font-medium text-muted-foreground px-1">Add new tag</p>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-input bg-transparent p-0.5 shrink-0"
                    title="Tag color"
                  />
                  <Input
                    placeholder="Tag name..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter') { e.preventDefault(); handleCreateTag(); }
                    }}
                    className="h-8 flex-1 text-sm"
                    maxLength={50}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 shrink-0"
                    disabled={!newTagName.trim() || createTag.isPending}
                    onClick={handleCreateTag}
                  >
                    {createTag.isPending
                      ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      : <Plus className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected tag badges */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map(id => {
            const tag = tags?.data?.find(t => t.id === id);
            if (!tag) return null;
            return (
              <Badge
                key={id}
                variant="secondary"
                className="gap-1 pr-1"
                style={tag.color ? { backgroundColor: tag.color, color: '#fff' } : undefined}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => toggleTag(id)}
                  className="rounded-full hover:bg-black/20 p-0.5"
                  aria-label={`Remove ${tag.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagMultiSelect;
