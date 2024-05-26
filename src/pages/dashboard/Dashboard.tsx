import { Toolbar } from "../../shared/components";
import { PageLayout } from "../../shared/layouts";


export const Dashboard = () => {
  return(
    <PageLayout
      title='Dashboard'
      toolbar={(
        <Toolbar
          showSearchInput
        />
      )}
    >
      Testando
    </PageLayout>
  );
};