/* eslint-disable react/hook-use-state */
/* eslint-disable no-undef */
import React, { FormEvent, useContext, useImperativeHandle } from "react";

type ValueProps = {
  [key: string]: any;
};

type IForm = {
  errors: ValueProps;
  setErrors: (errors: ValueProps) => void;
  values: ValueProps;
  setItems: (name: string, values: any) => void;
  addItem: (name: string, value: any) => void;
  removeItem: (name: string, index: number) => void;
  handleChange: (name: string) => (value: any) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<boolean>;
  setFieldValue: (name: string, value: any) => void;
};

const validate = (
  values: ValueProps,
  toucheds: {
    [key: string]: any;
  },
  validationSchema: any,
  callback: (errors: any) => void
) => {
  const data = serializeData(values);

  // console.log("validate touched: ", toucheds);
  // console.log("validate data: ", data);

  validationSchema
    .validate(data, { abortEarly: false })
    .then((isValid: boolean) => {
      // console.log("isValid: ", isValid);

      if (isValid) callback({});
    })
    .catch((err: any) => {
      const errors = err.inner.reduce((errors: any, currentError: any) => {
        if (!toucheds[currentError.path]) return errors;

        return {
          ...errors,
          [currentError.path]: currentError.message,
        };
      }, {});
      // console.log("validate errors: ", errors);

      callback(errors);
    });
};

const FormConfig: IForm = {
  errors       : {},
  setErrors    : () => () => null,
  values       : {},
  handleChange : () => () => null,
  setItems     : () => () => null,
  removeItem   : () => () => null,
  addItem      : () => () => null,
  handleSubmit : (_e?: FormEvent<HTMLFormElement>) => Promise.resolve(true),
  setFieldValue: () => null,
};

const FormContext = React.createContext<IForm>(FormConfig);

type Props = {
  initialValues: ValueProps;
  validationSchema?: any;
  onSubmit?: (values: any) => void;
  children: (props: IForm) => JSX.Element;
};

const deserializeObject = (payload: any, fieldName: string, value: any) => {
  return Object.keys(payload || {}).reduce<any>((accumulator, key) => {
    let reduces = accumulator;

    if (Array.isArray(payload[key])) {
      reduces = (payload[key] as any[]).reduce<any>(
        (accumulator, iterator, index) => {
          let reduces = accumulator as any;

          if (typeof iterator === "object") {
            reduces = deserializeObject(iterator, key + `[${index}].`, value);
          } else {
            reduces[fieldName + `${key}[${index}]`] = iterator;
          }

          return reduces;
        },
        reduces
      );
    } else if (typeof payload[key] === "object") {
      reduces = deserializeObject(payload[key], fieldName + key + ".", value);
    } else {
      reduces[fieldName + key] = payload[key];
    }

    return reduces;
  }, value);
};

const deserializeData = (data: any) => {
  return deserializeObject(data, "", {});
};

const serializeObject = (fields: string[], payload: any, value: any) => {
  const array = fields;
  const reduces = payload;

  const key = array.shift();
  if (!key) return value || reduces;

  if (key.indexOf("[") !== -1) {
    const field = key.split("[")[0];

    if (!field) return reduces;

    const index = parseInt(`${key.split("[")[1]?.replace("]", "")}`, 10);

    if (!reduces[field]) reduces[field] = [];
    if (!reduces[field][index]) reduces[field][index] = {};

    reduces[field][index] = serializeObject(
      array,
      reduces[field][index],
      value
    );

    return reduces;
  }

  if (array.length > 0) {
    reduces[key] = serializeObject(array, reduces[key] || {}, value);
  } else {
    reduces[key] = value;
  }

  return reduces;
};

const serializeData = (data: any) => {
  return Object.keys(data || {}).reduce<any>((accumulator, fieldName) => {
    let reduces = accumulator;
    const array = fieldName.split(".");

    reduces = serializeObject(array, reduces, data[fieldName]);

    return reduces;
  }, {});
};

// console.log(
//   "serializeData: ",
//   serializeData({
//     "profile.name": undefined,
//     "profile.age": undefined,
//     "works[0].name": undefined,
//     "works[1].name": undefined,
//     "works[3].sector.name": undefined,
//     "fields[0].values[0]": "a",
//     "fields[0].values[1]": "b",
//     "fieldValues[0].a": 10,
//     "fieldValues[1].b": 10,
//     "fieldValues[2].c": 10,
//     "fieldValues[3].d": 10,
//     "fieldValues[4].e": 10,
//   }),
// );

// console.log(
//   "deserializeData: ",
//   deserializeData({
//     profile: {
//       name: undefined,
//       age: undefined,
//     },
//     works: [
//       {
//         name: undefined,
//       },
//       {
//         name: undefined,
//       },
//       {
//         sector: {
//           name: undefined,
//         },
//       },
//     ],
//     fields: [
//       {
//         values: ["a", "b"],
//       },
//     ],
//     fieldValues: [
//       {
//         a: "10",
//       },
//       {
//         b: "10",
//       },
//       {
//         c: "10",
//       },
//       {
//         d: "10",
//       },
//       {
//         e: "10",
//       },
//     ],
//   }),
// );

export const useArrayField = (name: string) => {
  const { values, errors, setItems, addItem, removeItem } =
    useContext(FormContext);

  const items = React.useMemo(() => {
    return serializeData(values)[name] || [];
  }, [name, values]);

  const memoizedSetItems = React.useCallback(
    (items: any[]) => {
      setItems(name, items);
    },
    [setItems, name]
  );

  const memoizedAddItem = React.useCallback(
    (value: any) => {
      addItem(name, value);
    },
    [addItem, name]
  );

  const memoizedRemoveItem = React.useCallback(
    (index: number) => {
      removeItem(name, index);
    },
    [removeItem, name]
  );

  const error = React.useMemo(() => {
    return errors[name];
  }, [errors, name]);

  return {
    items,
    error,
    setItems  : memoizedSetItems,
    addItem   : memoizedAddItem,
    removeItem: memoizedRemoveItem,
  };
};

export const useField = (name: string) => {
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useContext(FormContext);

  const error = React.useMemo(() => {
    return errors[name];
  }, [errors, name]);

  const value = React.useMemo(() => {
    return values[name] || "";
  }, [values, name]);

  const onChange = React.useCallback(
    (value: any) => {
      handleChange(name)(value);
    },
    [handleChange, name]
  );

  const getValue = React.useCallback(() => {
    return serializeData(values)[name];
  }, [values, name]);

  const setValue = React.useCallback(
    (value: any) => {
      setFieldValue(name, value);
    },
    [setFieldValue, name]
  );

  return {
    error,
    value,
    onChange,
    onSubmit: handleSubmit,
    getValue,
    setValue,
  };
};

type IField = {
  name: string;
  children: ({ value, onChange, error }: any) => JSX.Element;
};

export const Field = ({ name, children }: IField) => {
  const { value, onChange, error } = useField(name);

  return children({ value, onChange, error });
};

export type IFormRef<T> = {
  submit: () => any;
  validate: () => Promise<{ [key: string]: string }>;
  setFormData: (callback: (state: T) => T) => void;
  getValues: () => T;
  setFieldValue: (name: string, value: any) => void;
};

const Form = React.forwardRef(
  (
    { initialValues, validationSchema, onSubmit, children }: Props,
    ref: React.Ref<IFormRef<any>>
  ) => {
    const deserialize = deserializeData(initialValues);
    const [submitted, setSubmitted] = React.useState(false);
    const [values, setFormData] = React.useState(deserializeData(deserialize));
    const [, setTouched] = React.useState<{ [key: string]: any }>(
      Object.keys(deserializeData(deserialize)).reduce(
        (accumulator, iterator) => ({
          ...accumulator,
          [iterator]: false,
        }),
        {}
      )
    );
    const [errors, setErrors] = React.useState({});

    const getValues = React.useCallback(() => {
      return values;
    }, [values]);

    useImperativeHandle(ref, () => ({
      submit() {
        return handleSubmit();
      },
      validate() {
        return new Promise((resolve) => {
          setSubmitted(true);

          const touched = Object.keys(values || {}).reduce(
            (accumulator, iterator) => ({
              ...accumulator,
              [iterator]: true,
            }),
            Object.keys(initialValues || {}).reduce((accumulator, iterator) => {
              return {
                ...accumulator,
                [iterator]: true,
              };
            }, {})
          );

          setTouched(touched);

          validate(values, touched, validationSchema, (errors) => {
            setErrors(errors);

            resolve(errors || {});
          });
        });
      },
      setFormData: (
        callback: (state: typeof initialValues) => typeof initialValues
      ) => {
        let data = serializeData(values);

        const result = callback(data);

        result && setFormData(deserializeData(result));
      },
      getValues,
      setFieldValue,
    }));

    // const handleChange = (name: string) => (value: any) => {
    //   const data = { ...values, [name]: value };

    //   if (touched[name] === true)
    //     validate(data, touched, validationSchema, (errors) => {
    //       setErrors(errors);
    //     });

    //   setTouched((state) => ({ ...state, [name]: true }));
    //   setFormData(data);
    // };

    const handleChange = React.useCallback(
      (name: string) => (value: any) => {
        setTouched((touched) => {
          setFormData((values: any) => {
            const data = { ...values, [name]: value };

            if (touched[name] === true) {
              validate(data, touched, validationSchema, (errors) => {
                setErrors(errors);
              });
            }

            return data;
          });

          return { ...touched, [name]: true };
        });
      },
      [validationSchema]
    );

    const handleSubmit = (
      e?: FormEvent<HTMLFormElement>
    ): Promise<any | null> => {
      e?.preventDefault();

      const data = serializeData(values);

      setSubmitted(true);

      const touched = Object.keys(values || {}).reduce(
        (accumulator, iterator) => ({
          ...accumulator,
          [iterator]: true,
        }),
        Object.keys(initialValues || {}).reduce((accumulator, iterator) => {
          return {
            ...accumulator,
            [iterator]: true,
          };
        }, {})
      );

      setTouched(touched);

      return new Promise((resolve) => {
        if (validationSchema) {
          validate(values, touched, validationSchema, (errors) => {
            setErrors(errors);

            if (onSubmit && Object.keys(errors || {}).length === 0) {
              onSubmit(data);
            }

            if (Object.keys(errors || {}).length === 0) {
              resolve(data);
            } else {
              resolve(null);
            }
          });
        } else if (onSubmit) {
          onSubmit(data);
          resolve(data);
        }
      });
    };

    const setFieldValue = React.useCallback((name: string, value: any) => {
      setFormData((state: any) => {
        const serializedData = serializeData(state);

        let val = value;

        if (typeof value === "function") {
          val = value(serializedData[name]);
        }

        return deserializeData({
          ...serializedData,
          [name]: val,
        });
      });
    }, []);

    const addItem = React.useCallback((name: string, value: any) => {
      setFormData((values: any) => {
        const data = serializeData(values);

        if (!data[name]) data[name] = [];

        data[name].push(value);

        const deserialize = deserializeData(data);

        if (submitted && validationSchema) {
          const touched = Object.keys(deserialize).reduce(
            (accumulator, iterator) => ({
              ...accumulator,
              [iterator]: true,
            }),
            {}
          );

          setTouched(touched);

          validate(deserialize, touched, validationSchema, (errors) => {
            setErrors(errors);
          });
        }

        return deserialize;
      });
    }, [submitted, validationSchema]);

    const removeItem = React.useCallback((name: string, index: number) => {
      setFormData((values: any) => {
        const data = serializeData(values);

        data[name] = data[name]?.filter((_i: any, i: number) => i !== index);

        const deserialize = deserializeData(data);

        if (submitted && validationSchema) {
          const touched = Object.keys(deserialize).reduce(
            (accumulator, iterator) => ({
              ...accumulator,
              [iterator]: true,
            }),
            {}
          );

          setTouched(touched);

          validate(deserialize, touched, validationSchema, (errors) => {
            setErrors(errors);
          });
        }

        return deserialize;
      });
    }, [submitted, validationSchema]);

    const setItems = React.useCallback((name: string, items: any[]) => {
      setFormData((values: any) => {
        const data = serializeData(values);

        data[name] = items;

        const deserialize = deserializeData(data);

        if (submitted && validationSchema) {
          const touched = Object.keys(deserialize).reduce(
            (accumulator, iterator) => ({
              ...accumulator,
              [iterator]: true,
            }),
            {}
          );

          setTouched(touched);

          validate(deserialize, touched, validationSchema, (errors) => {
            setErrors(errors);
          });
        }

        return deserialize;
      });
    }, [submitted, validationSchema]);

    const setFormErrors = React.useCallback((errors: any) => {
      setErrors(errors);
    }, []);

    return (
      <FormContext.Provider
        value={{
          errors,
          setErrors: setFormErrors,
          values,
          setItems,
          removeItem,
          addItem,
          setFieldValue,
          handleChange,
          handleSubmit,
        }}
      >
        {children({
          values   : serializeData(values),
          setItems,
          removeItem,
          addItem,
          errors,
          setErrors: setFormErrors,
          setFieldValue,
          handleChange,
          handleSubmit,
        })}
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

export { Form };
