export const cleanFormData = (formValue: any) => {
    return Object.fromEntries(
        Object.entries(formValue).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
    );
} 
