"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { countries } from "@/components/CountrySelect/countries";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";

function App() {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [pageNo, setPage] = useState(0);
  //Checks if there are more pages to be loaded
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setNextPageLoading] = useState(false);
  const [selectedValue, setSelectedOption] = useState("");

  const loadOptions = async (page: number) => {
    try {
      const size = 20;
      setNextPageLoading(true);
      const totalPassengers = countries.length;
      const dataOptions = countries
        .slice(page * size, size * (page + 1))
        .map(([c]) => ({ label: c, value: c }));
      const itemsData = options.concat(dataOptions);
      setOptions(itemsData);
      setNextPageLoading(false);
      setHasNextPage(itemsData.length < totalPassengers);
      setPage(page);
    } catch (err) {
      console.log(err); // eslint-disable
    }
  };

  const loadNextPage = async () => {
    await loadOptions(pageNo + 1);
  };

  return (
    <div className="App">
      <div className="dropdown">
        <div className="label">
          <label>Passenger name</label>
        </div>
        <SelectWrapper
          value={selectedValue}
          placeholder="Select"
          isClearable
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          options={options}
          loadNextPage={loadNextPage}
          onChange={(selected) => setSelectedOption(selected.value)}
        />
      </div>
    </div>
  );
}

export default App;

const SelectWrapper = ({
  hasNextPage,
  isNextPageLoading,
  options,
  loadNextPage,
  placeholder,
  onChange,
  value,
}: {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  options: { label: string; value: string }[];
  loadNextPage: () => void;
  placeholder: string;
  onChange: (selected: { label: string; value: string }) => void;
  value: string;
  isClearable: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Extra row to hold a loading indicator if more options are present
  const itemCount = hasNextPage ? options.length + 1 : options.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < options.length;

  const MenuList = ({ children }: { children: React.ReactNode }) => {
    const childrenArray = React.Children.toArray(children);
    // Render an item or a loading indicator.

    const handleChange = (selected: { label: string; value: string }) => {
      onChange(selected);
    };

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <InfiniteLoader
            isItemLoaded={(index: number) => index < options.length}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={150}
                itemCount={itemCount}
                itemSize={35}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
                overscanCount={4} //The number of options (rows or columns) to render outside of the visible area.
              >
                {({ index, style, ...rest }) => (
                  <div
                    className="drop-down-list"
                    style={{
                      borderBottom: "1px solid rgb(243 234 234 / 72%)",
                      display: "flex",
                      alignItems: "center",
                      ...style,
                    }}
                    onClick={() => handleChange(options[index])}
                    {...rest}
                  >
                    {isItemLoaded(index) && childrenArray[index]
                      ? childrenArray[index]
                      : `Loading...`}
                  </div>
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    );
  };

  return (
    <Select
      placeholder={placeholder}
      components={{ MenuList }}
      value={options.find((c) => c.value === value)}
      options={options}
      getOptionLabel={(option) => option.value}
      isClearable
    />
  );
};
