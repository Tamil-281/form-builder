import { createContext, useContext, useReducer } from 'react';
import type { FormBuilderState, FormBuilderAction } from './type';
import type { FormLayout, FormRow, FormColumn, FormField } from '@dnd';

const initialState: FormBuilderState = {
  layout: { rows: [] },
  selectedItem: null,
};

const formBuilderReducer = (
  state: FormBuilderState,
  action: FormBuilderAction,
): FormBuilderState => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: [...state.layout.rows, action.row],
        },
      };

    case 'ADD_COLUMN':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId ? { ...row, columns: [...row.columns, action.column] } : row,
          ),
        },
      };

    case 'ADD_FIELD':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId
                      ? { ...col, fields: [...col.fields, action.field] }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'ADD_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId
                      ? {
                          ...col,
                          nestedRows: [...(col.nestedRows || []), action.nestedRow],
                        }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'REMOVE_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.filter(row => row.id !== action.rowId),
        },
      };

    case 'REMOVE_COLUMN':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? { ...row, columns: row.columns.filter(col => col.id !== action.columnId) }
              : row,
          ),
        },
      };

    case 'REMOVE_FIELD':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId
                      ? { ...col, fields: col.fields.filter(field => field.id !== action.fieldId) }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'REMOVE_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).filter(
                            nestedRow => nestedRow.id !== action.nestedRowId,
                          ),
                        }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId
                      ? {
                          ...col,
                          fields: col.fields.map(field =>
                            field.id === action.fieldId ? { ...field, ...action.updates } : field,
                          ),
                        }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'UPDATE_COLUMN':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.columnId ? { ...col, ...action.updates } : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: { type: action.itemType, id: action.id },
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedItem: null,
      };

    case 'LOAD_LAYOUT':
      return {
        ...state,
        layout: action.layout,
      };

    default:
      return state;
  }
};

export const FormBuilderContext = createContext<{
  state: FormBuilderState;
  dispatch: React.Dispatch<FormBuilderAction>;
} | null>(null);

export const FormBuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);

  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
