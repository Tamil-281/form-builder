import { Header, Sidebar, Button } from '@sb-components';
import type { FormBuilderDashboardProps } from './type';
import { Canvas, PropertiesPanel } from '@dnd';
import { Eye, AlertTriangle } from 'lucide-react';
import { FormPreview } from './FormPreview';
import { useFormBuilder } from '@context';
import { getAllFieldLabels } from '@utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@sb-components';

const FormBuilderDashboard = (props: FormBuilderDashboardProps) => {
  const { showPreview, onPreview, onClosePreview } = props;
  const { state, dispatch } = useFormBuilder();
  const [duplicateLabels, setDuplicateLabels] = useState<string[]>([]);

  const handlePreviewClick = () => {
    // Check for duplicate labels before showing preview
    const allLabels = getAllFieldLabels(state.layout);
    const duplicates = allLabels.filter((label, index) => allLabels.indexOf(label) !== index);
    const uniqueDuplicates = [...new Set(duplicates)];

    if (uniqueDuplicates.length > 0) {
      setDuplicateLabels(uniqueDuplicates);
      // You can choose to show the preview anyway or prevent it
      // For now, I'll show the preview but display a warning
    } else {
      setDuplicateLabels([]);
    }

    onPreview();
  };

  return (
    <div className="h-screen w-screen bg-bg-primary">
      <Header>
        <Button onClick={handlePreviewClick} variant="outline" className="flex items-center gap-2">
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
      <Dialog open={showPreview} onOpenChange={open => !open && onClosePreview()}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="flex">
            <div className="flex items-center gap-3">
              <DialogTitle>Form Preview</DialogTitle>
              {duplicateLabels.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    {duplicateLabels.length} duplicate label{duplicateLabels.length > 1 ? 's' : ''}{' '}
                    found
                  </span>
                </div>
              )}
            </div>
          </DialogHeader>

          {duplicateLabels.length > 0 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Duplicate Labels Found:
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                {duplicateLabels.map((label, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>"{label}" appears
                    multiple times
                  </li>
                ))}
              </ul>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                Consider renaming these fields to avoid confusion in form submission.
              </p>
            </div>
          )}

          <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            <FormPreview />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormBuilderDashboard;
