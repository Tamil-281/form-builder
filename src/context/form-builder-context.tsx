import { createContext, useContext, useReducer } from 'react';
import type { FormBuilderState, FormBuilderAction } from './type';

const initialState: FormBuilderState = {
  layout: { rows: [] },
  selectedItem: null,
};

const formBuilderReducer = (
  state: FormBuilderState,
  action: FormBuilderAction,
): FormBuilderState => {
  console.log('action', action);

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

    case 'ADD_COLUMN_TO_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? { ...nestedRow, columns: [...nestedRow.columns, action.column] }
                              : nestedRow,
                          ),
                        }
                      : col,
                  ),
                }
              : row,
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

    case 'ADD_FIELD_TO_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: nestedRow.columns.map(nestedCol =>
                                    nestedCol.id === action.columnId
                                      ? {
                                          ...nestedCol,
                                          fields: [...nestedCol.fields, action.field],
                                        }
                                      : nestedCol,
                                  ),
                                }
                              : nestedRow,
                          ),
                        }
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

    case 'REMOVE_COLUMN_FROM_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: nestedRow.columns.filter(
                                    col => col.id !== action.columnId,
                                  ),
                                }
                              : nestedRow,
                          ),
                        }
                      : col,
                  ),
                }
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

    case 'REMOVE_FIELD_FROM_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: nestedRow.columns.map(nestedCol =>
                                    nestedCol.id === action.columnId
                                      ? {
                                          ...nestedCol,
                                          fields: nestedCol.fields.filter(
                                            field => field.id !== action.fieldId,
                                          ),
                                        }
                                      : nestedCol,
                                  ),
                                }
                              : nestedRow,
                          ),
                        }
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

    case 'UPDATE_FIELD_IN_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: nestedRow.columns.map(nestedCol =>
                                    nestedCol.id === action.columnId
                                      ? {
                                          ...nestedCol,
                                          fields: nestedCol.fields.map(field =>
                                            field.id === action.fieldId
                                              ? { ...field, ...action.updates }
                                              : field,
                                          ),
                                        }
                                      : nestedCol,
                                  ),
                                }
                              : nestedRow,
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

    case 'UPDATE_COLUMN_IN_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: nestedRow.columns.map(nestedCol =>
                                    nestedCol.id === action.columnId
                                      ? { ...nestedCol, ...action.updates }
                                      : nestedCol,
                                  ),
                                }
                              : nestedRow,
                          ),
                        }
                      : col,
                  ),
                }
              : row,
          ),
        },
      };

    case 'MOVE_COLUMN':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.rowId
              ? {
                  ...row,
                  columns: (() => {
                    const columns = [...row.columns];
                    // Swap the columns at fromIndex and toIndex
                    [columns[action.fromIndex], columns[action.toIndex]] = [
                      columns[action.toIndex],
                      columns[action.fromIndex],
                    ];
                    return columns;
                  })(),
                }
              : row,
          ),
        },
      };

    case 'MOVE_COLUMN_IN_NESTED_ROW':
      return {
        ...state,
        layout: {
          ...state.layout,
          rows: state.layout.rows.map(row =>
            row.id === action.parentRowId
              ? {
                  ...row,
                  columns: row.columns.map(col =>
                    col.id === action.parentColumnId
                      ? {
                          ...col,
                          nestedRows: (col.nestedRows || []).map(nestedRow =>
                            nestedRow.id === action.nestedRowId
                              ? {
                                  ...nestedRow,
                                  columns: (() => {
                                    const columns = [...nestedRow.columns];
                                    // Swap the columns at fromIndex and toIndex
                                    [columns[action.fromIndex], columns[action.toIndex]] = [
                                      columns[action.toIndex],
                                      columns[action.fromIndex],
                                    ];
                                    return columns;
                                  })(),
                                }
                              : nestedRow,
                          ),
                        }
                      : col,
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
