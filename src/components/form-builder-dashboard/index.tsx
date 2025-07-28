import { Header, Sidebar } from '@sb-components';
import type { FormBuilderDashboardProps } from './type';
import { Canvas, PropertiesPanel } from '@dnd';

const FormBuilderDashboard = (props: FormBuilderDashboardProps) => {
  // const { showPreview, onPreview, onClosePreview, context } = props;

  return (
    <div className="h-screen w-screen  bg-bg-primary">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex">
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};

export default FormBuilderDashboard;
