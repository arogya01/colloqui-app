import React from "react";
import { Input, YStack, InputProps } from "tamagui";

interface CustomInputProps extends InputProps {
  containerPadding?: string;
}

const TextField = ({ containerPadding = "$4", ...props }: CustomInputProps) => {
  return (
    <YStack padding={containerPadding}>
      <Input
        size='$4'
        borderWidth={1}
        borderColor='$gray400'
        borderRadius='$2'
        paddingHorizontal='$3'        
        placeholderTextColor='$gray500'
        fontSize='$2'
        backgroundColor='$background'
        color='$color'
        {...props}
      />
    </YStack>
  );
};

export default TextField;
