import { Context, createContext, JSXElement, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

// T is the form type
// K is the response type
interface IFormProviderProps<T, K> {
  initialState: T;
  // eslint-disable-next-line no-unused-vars
  submit: (form: T) => K;
  children: JSXElement;
}

type State<T> = T & {
  loading: boolean;
  hasError: boolean;
  error: unknown;
};

type IFormStore<T, K> = [
  State<T>,
  {
    setState: SetStoreFunction<State<T>>;
    submit: () => Promise<K>;
  }
];

const FormContextGeneric = <T, K>() => createContext<IFormStore<T, K>>();
let FormContext: unknown;

export function FormProvider<T extends object, K extends object>(
  props: IFormProviderProps<T, K>
) {
  const [state, setState] = createStore<State<T>>({
    ...props.initialState,
    loading: false,
    hasError: false,
    error: null,
  });

  const store: IFormStore<T, K> = [state, { setState, submit }];

  async function submit() {
    setState((prev) => ({ ...prev, loading: true }));
    const ret = await props.submit(state);
    const hasError = ret && !!Object.hasOwn(ret, "error");
    setState((prev) => ({
      ...prev,
      loading: false,
      hasError,
      error: hasError ? "Error" : null,
    }));

    return ret;
  }

  FormContext = FormContextGeneric<T, K>() as Context<IFormStore<T, K>>;
  const FormContextComponent = FormContext as Context<IFormStore<T, K>>;
  return (
    <FormContextComponent.Provider value={store}>
      {props.children}
    </FormContextComponent.Provider>
  );
}

export function useForm<T, K>() {
  return useContext<IFormStore<T, K>>(
    FormContext as Context<IFormStore<T, K>>
  );
}
