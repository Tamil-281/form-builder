import { Header, Sidebar, Button } from '@sb-components';
import type { FormBuilderDashboardProps } from './type';
import { Canvas, PropertiesPanel } from '@dnd';
import { Eye, X } from 'lucide-react';
import { FormPreview } from './FormPreview';

const FormBuilderDashboard = (props: FormBuilderDashboardProps) => {
  const { showPreview, onPreview, onClosePreview } = props;

  return (
    <div className="h-screen w-screen bg-bg-primary">
      <Header>
        <Button 
          onClick={onPreview}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </Header>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex">
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Form Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClosePreview}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              <FormPreview />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilderDashboard;
