import TaskList from "@/components/TaskList";
import ProductBacklogButtons from "@/components/ProductBacklogButtons";

import { getAllProductBacklogItems } from "@/lib/actions/product_backlog_item.actions";
import { IProductBacklogItem } from "@/lib/database/models/product_backlog_item.model";

const ProductBacklogPage = async () => {
  const tasks: IProductBacklogItem[] = await getAllProductBacklogItems();

  return (
    <main>
      {/* Page Header */}
      <div className="h-full w-full flex-col space-y-4 mr-4">
        <div className="pt-4 flex w-full h-fit gap-6 items-center">
          <ProductBacklogButtons />
        </div>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default ProductBacklogPage;
