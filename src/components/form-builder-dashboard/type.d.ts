export type FormBuilderDashboardProps = {
  showPreview: boolean;
  onPreview: () => void;
  onClosePreview: () => void;
  context: (context: React.ReactNode) => void;
};
