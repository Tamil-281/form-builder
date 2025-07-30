import { useState } from 'react';

import { FormBuilderContext } from '@components';
import { FormBuilderProvider } from '@context';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FormBuilder = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [, setContext] = useState<React.ReactNode>(null);

  return (
    <FormBuilderProvider>
      <DndProvider backend={HTML5Backend}>
        <FormBuilderContext
          showPreview={showPreview}
          onPreview={() => setShowPreview(true)}
          onClosePreview={() => setShowPreview(false)}
          context={setContext}
        />
      </DndProvider>
    </FormBuilderProvider>
  );
};

export default FormBuilder;
