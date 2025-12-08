import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Search tracks or albums..",
  debounceMs = 500,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search size={18} />
      </InputLeftElement>
      <Input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        bg="white"
        color="gray.800"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          borderColor: "brand.400",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
        }}
      />
      {query && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<X size={18} />}
            size="sm"
            variant="ghost"
            onClick={handleClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
