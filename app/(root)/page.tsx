import { Container, Filters, ProductsGroupList, TopBar, Stories } from "@/shared/components";
import { findProducts } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-products";
import { Suspense } from "react";

const HomePage = async ({ searchParams }: { searchParams: GetSearchParams }) => {
  const categories = await findProducts(searchParams);

  return (
    <>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[50px] xl:gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => {
                return (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
