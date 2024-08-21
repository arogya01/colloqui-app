import React from "react";
import { Input, YStack, InputProps } from "tamagui";

interface CustomInputProps extends InputProps {
  containerPadding?: string;
  backgroundColor?: string;
  color?: string;
}

const TextField = ({ containerPadding = "$4", ...props }: CustomInputProps) => {
  return (
    <YStack padding={containerPadding}>
      <Input
        size="$2"
        borderWidth={1}
        borderColor="$gray400"
        borderRadius="$2"
        paddingHorizontal="$3"
        placeholderTextColor="$gray500"
        backgroundColor={props.backgroundColor}
        color={props.color}
        {...props}
      />
    </YStack>
  );
};

export default TextField;
