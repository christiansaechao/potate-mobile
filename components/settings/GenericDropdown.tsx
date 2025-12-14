import React from "react";
import { FlatList, Modal, Platform, Pressable, Text, View } from "react-native";

import { C, styles } from "@/components/settings/Styles";

type Option<T> = { label: string; value: T };

type DropdownProps<T> = {
  state: T;
  options: Option<T>[];
  setState: React.Dispatch<React.SetStateAction<T>>;
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
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(
    () => options.find((o) => Object.is(o.value, state)),
    [options, state]
  );

  return (
    <>
      {/* Trigger */}
      <Pressable style={styles.dropdownTrigger} onPress={() => setOpen(true)}>
        <Text
          style={
            selected
              ? styles.dropdownTriggerText
              : styles.dropdownTriggerPlaceholder
          }
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Text style={{ color: C.muted, fontSize: 18 }}>▾</Text>
      </Pressable>

      {/* Sheet */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <Pressable
            onPress={() => {}}
            style={[
              styles.sheet,
              { paddingBottom: Platform.OS === "ios" ? 24 : 16 },
            ]}
          >
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{title}</Text>
              <Pressable onPress={() => setOpen(false)}>
                <Text style={styles.sheetClose}>Close</Text>
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
                  >
                    <Text style={styles.optionLabel}>{item.label}</Text>
                    {isSelected ? <Text style={styles.check}>✓</Text> : null}
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
