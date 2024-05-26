import { ListingTools } from "../../shared/components";
import { PageLayout } from "../../shared/layouts";


export const Dashboard = () => {
  return(
    <PageLayout
      title='Dashboard'
      toolbar={(
        <ListingTools
          showSearchInput
        />
      )}
    >
      Testando
    </PageLayout>
  );
};