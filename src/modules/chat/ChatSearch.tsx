import React, { useState, useEffect } from 'react';
import { Image, Stack, XStack, YStack, Input, ScrollView, Text, styled } from "tamagui";
import { Modal } from 'react-native';
import { colors } from "../../theme";
import SearchIcon from "../../../assets/search.svg";
import CrossIcon from "./cross.svg";
import { useSearchUser } from '../../hooks/services/useSearchUser';

const FullScreenInput = styled(Input, {
  flex: 1,
  fontSize: 16,
  paddingVertical:'$2',
  paddingHorizontal:'$4',
  color: colors.primaryBlack,
})

const Option = styled(XStack, {
  padding: '$3',
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGray,
})

const ChatSearch = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  



  const {data: availableUsers, isLoading = false}  = useSearchUser({userName:searchTerm}); 


  console.log('davailableUsersata',availableUsers);
  const handleFocus = () => {
    setIsFullScreen(true);
  };

  const handleBlur = () => {
    setIsFullScreen(false);
    setSearchTerm('');
    setOptions([]);
  };

  const renderFullScreenSearch = () => (
    <Modal visible={isFullScreen} animationType="slide">
      <YStack flex={1} backgroundColor={colors.primaryBlack}>
        <XStack gap="$2" alignItems="center" padding="$2">
          {/* <Image source={SearchIcon} width={16} height={16} alt="search" /> */}
          <FullScreenInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search username..."
            autoFocus
          />
          <Text onPress={handleBlur} color={colors.primaryWhite}>Cancel</Text>
        </XStack>
        <ScrollView>
          {Array.isArray(availableUsers) ? availableUsers.map((option, index) => (
            <Option key={index}>
              <Text>{option}</Text>
            </Option>
          )) : null}
        </ScrollView>
      </YStack>
    </Modal>
  );

  return (
    <Stack>
      <XStack alignItems="center">
        {/* <Image source={SearchIcon} width={16} height={16} alt="search" /> */}
        <Input
          backgroundColor={colors.primaryWhite}
          borderRadius="$8"
          paddingVertical="$2"
          paddingHorizontal="$4"
          margin="$4"
          width="90%"     
          color={colors.primaryBlack}
          placeholder="Search..."          
          onFocus={handleFocus}
        />
      </XStack>
      {renderFullScreenSearch()}
    </Stack>
  );
};

export default ChatSearch;