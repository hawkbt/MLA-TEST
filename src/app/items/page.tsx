import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const filters = await searchParams;
  console.log(filters);
  return <main>SearchPage</main>;
};

export default SearchPage;
