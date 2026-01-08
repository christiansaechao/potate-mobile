import React from "react";
import { FlatList, Modal, Platform, Pressable, View } from "react-native";

import { styles } from "@/components/settings/Styles";
import { THEMES } from "@/constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { CustomText } from "../custom/custom-text";
import { SquishyButton } from "../ui/SquishyButton";

// --- Types ---

type Option<T> = { label: string; value: T };

type DropdownProps<T> = {
  state: T;
  options: Option<T>[];
  setState: (val: T) => void;
  placeholder?: string;
  title?: string;
};

export const GenericDropdown = <T,>({
  state,
  options,
  setState,
  placeholder = "Select…",
  title = "Choose",
}: DropdownProps<T>) => {
  // --- State & Hooks ---

  const [open, setOpen] = React.useState(false);

  const { theme, mode } = useTheme();

  // --- Derived State ---

  const selected = React.useMemo(
    () => options.find((o) => Object.is(o.value, state)),
    [options, state]
  );

  const backgroundColor = THEMES[theme][mode];

  // --- Render ---

  return (
    <>
      {/* Trigger */}
      <SquishyButton
        style={styles.dropdownTrigger}
        onPress={() => setOpen(true)}
      >
        <View
          className={`${backgroundColor} flex-row justify-between items-center w-full transition-colors duration-300`}
        >
          <CustomText numberOfLines={1}>
            {selected?.label ?? placeholder}
          </CustomText>
          <CustomText>▾</CustomText>
        </View>
      </SquishyButton>

      {/* Sheet */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
        className={`${backgroundColor}`}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <Pressable
            onPress={() => {}}
            style={[
              styles.sheet,
              { paddingBottom: Platform.OS === "ios" ? 24 : 16 },
            ]}
            className={`${backgroundColor}`}
          >
            <View style={styles.sheetHeader}>
              <CustomText>{title}</CustomText>
              <Pressable onPress={() => setOpen(false)}>
                <CustomText>Close</CustomText>
              </Pressable>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => {
                const isSelected = Object.is(item.value, state);

                return (
                  <Pressable
                    style={styles.optionRow}
                    onPress={() => {
                      setState(item.value);
                      setOpen(false);
                    }}
                    className={`${backgroundColor}`}
                  >
                    <CustomText>{item.label}</CustomText>
                    {isSelected ? <CustomText>✓</CustomText> : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
