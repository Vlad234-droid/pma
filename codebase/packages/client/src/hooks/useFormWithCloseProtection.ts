import { useEffect } from "react";
import { useForm as useReactHookForm } from "react-hook-form"

export const useFormWithCloseProtection: typeof useReactHookForm = (props) => {
    const form = useReactHookForm(props)
    const values = form.getValues()
    const isMyDirty = !props?.defaultValues && Object.values(values).filter(el => el).length
    const isDirty = form.formState.isDirty || isMyDirty

    useEffect(() => {
        if(isDirty) {
            window.onbeforeunload = () => true
        }

        return () => {
            window.onbeforeunload = null
        }
    }, [isDirty])

    return form;
}