// import { ChangeEvent } from 'react';

// interface InputProps {
//   type?: string;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
//   rows?: number;
// }

// export default function Input({
//   type = 'text',
//   value,
//   onChange,
//   placeholder = '',
//   className = '',
//   disabled = false,
//   rows
// }: InputProps) {
//   const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
  
//   if (rows) {
//     return (
//       <textarea
//         value={value}
//         onChange={onChange as any}
//         placeholder={placeholder}
//         disabled={disabled}
//         rows={rows}
//         className={`${baseClasses} ${className}`}
//       />
//     );
//   }

//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       disabled={disabled}
//       className={`${baseClasses} ${className}`}
//     />
//   );
// }




// import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement>, TextareaHTMLAttributes<HTMLTextAreaElement> {
//   type?: string;
//   value: string | number;
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
//   rows?: number;
// }

// export default function Input({
//   type = 'text',
//   value,
//   onChange,
//   placeholder = '',
//   className = '',
//   disabled = false,
//   rows,
//   ...rest // This will capture any additional props like min, max, etc.
// }: InputProps) {
//   const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
  
//   if (rows) {
//     return (
//       <textarea
//         value={value}
//         onChange={onChange as ChangeEvent<HTMLTextAreaElement>} // Cast to the correct type
//         placeholder={placeholder}
//         disabled={disabled}
//         rows={rows}
//         className={`${baseClasses} ${className}`}
//         {...rest} // Spread the rest of the props to the textarea element
//       />
//     );
//   }

//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       disabled={disabled}
//       className={`${baseClasses} ${className}`}
//       {...rest} // Spread the rest of the props to the input element
//     />
//   );
// }










// import React from 'react';
// import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// // Base props that apply to both input and textarea
// type BaseInputProps = {
//   className?: string;
//   disabled?: boolean;
//   placeholder?: string;
// };

// // Input-specific props
// type InputElementProps = BaseInputProps & {
//   type?: 'text' | 'number' | 'range' | 'password' | 'email';
//   rows?: never; // Prevent textarea prop from being used with input
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   value?: string | number | readonly string[];
// } & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

// // Textarea-specific props
// type TextareaElementProps = BaseInputProps & {
//   rows: number;
//   type?: never; // Prevent input prop from being used with textarea
//   onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   value?: string | readonly string[];
// } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

// // Combined union type
// type InputComponentProps = InputElementProps | TextareaElementProps;

// const Input = (props: InputComponentProps) => {
//   const {
//     className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
//     disabled = false,
//     ...rest
//   } = props;

//   if ('rows' in rest) {
//     const { rows, value, onChange, placeholder, ...textareaProps } = rest as TextareaElementProps;
//     return (
//       <textarea
//         {...textareaProps}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         rows={rows}
//         className={className}
//       />
//     );
//   }

//   const { type = 'text', value, onChange, placeholder, ...inputProps } = rest as InputElementProps;
//   return (
//     <input
//       {...inputProps}
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       disabled={disabled}
//       className={className}
//     />
//   );
  
// };



// export default Input;











import React from 'react';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Base props that apply to both input and textarea
type BaseInputProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

// Input-specific props
type InputElementProps = BaseInputProps & {
  type?: 'text' | 'number' | 'range' | 'password' | 'email' | 'file'; // Added 'file' type
  rows?: never; // Prevent textarea prop from being used with input
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

// Textarea-specific props
type TextareaElementProps = BaseInputProps & {
  rows: number;
  type?: never; // Prevent input prop from being used with textarea
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | readonly string[];
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

// Combined union type
type InputComponentProps = InputElementProps | TextareaElementProps;

const Input = (props: InputComponentProps) => {
  const {
    className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
    disabled = false,
    ...rest
  } = props;

  if ('rows' in rest) {
    const { rows, value, onChange, placeholder, ...textareaProps } = rest as TextareaElementProps;
    return (
      <textarea
        {...textareaProps}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={className}
      />
    );
  }

  const { type = 'text', value, onChange, placeholder, ...inputProps } = rest as InputElementProps;

  // Handle file input type
  if (type === 'file') {
    return (
      <input
        {...inputProps}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
      />
    );
  }

  return (
    <input
      {...inputProps}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
};

export default Input;


