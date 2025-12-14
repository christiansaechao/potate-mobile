export const C = {
  bg: "#2E3947", // page background
  card: "#364252", // main card
  panel: "#2B3545", // inner panel
  panel2: "#303B4B", // rows / pills
  text: "#EAF0F7",
  muted: "#AEB7C6",
  icon: "#EAF0F7",
  accent: "#7FD7BE", // mint
  accentText: "#1F2A35",
  divider: "rgba(255,255,255,0.08)",
};

export const styles = {
  screen: { flex: 1, backgroundColor: C.bg },
  container: { paddingHorizontal: 18, paddingBottom: 32 },
  headerWrap: { paddingTop: 10, paddingBottom: 10 },
  // big rounded title like the mock
  title: {
    textAlign: "center" as const,
    color: C.text,
    // gives that “puffy” contrast look on dark bg
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center" as const,
    color: C.accent,
  },
  outerCard: {
    backgroundColor: C.card,
    borderRadius: 28,
    padding: 18,
    marginTop: 18,
    // soft shadow like the mock
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.accent,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 10,
  },
  name: { fontSize: 28, lineHeight: 34, color: C.text },
  email: { fontSize: 16, lineHeight: 20, color: C.muted, marginTop: 2 },

  sectionTitle: {
    fontSize: 24,
    lineHeight: 30,
    color: C.accent,
    marginBottom: 12,
  },

  panel: {
    backgroundColor: C.panel,
    borderRadius: 22,
    padding: 16,
  },

  row: {
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row" as const,
    justifyItems: "center",
    alignItems: "center" as const,
    gap: 12,
  },
  label: { fontSize: 18, lineHeight: 22, color: C.text },

  pill: {
    backgroundColor: C.panel2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    minWidth: 86,
    alignItems: "center" as const,
  },
  pillText: { fontSize: 18, lineHeight: 22, color: C.accent },

  divider: { height: 1, backgroundColor: C.divider },

  // save button like mock
  save: {
    backgroundColor: C.accent,
    borderRadius: 999,
    paddingVertical: 18,
    marginTop: 18,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  saveText: {
    fontSize: 24,
    lineHeight: 30,
    color: C.accentText,
  },

  // preference row card
  prefRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: C.panel,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 14,
  },

  dropdownTrigger: {
    backgroundColor: C.panel2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    minWidth: "100%" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  dropdownTriggerText: {
    fontSize: 18,
    lineHeight: 22,
    color: C.accent,
  },
  dropdownTriggerPlaceholder: {
    fontSize: 18,
    lineHeight: 22,
    color: C.muted,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end" as const,
  },
  sheet: {
    backgroundColor: C.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 16,
  },
  sheetHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingBottom: 10,
  },
  sheetTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: C.text,
  },
  sheetClose: {
    fontSize: 16,
    lineHeight: 20,
    color: C.muted,
  },

  optionRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: C.panel,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 10,
  },
  optionLabel: {
    fontSize: 18,
    lineHeight: 22,
    color: C.text,
  },
  check: {
    fontSize: 18,
    lineHeight: 22,
    color: C.accent,
  },

  // weekly goal row card
  weeklyRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: C.panel,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 14,
  },
  weeklyRight: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
  },
  weeklyValue: { fontSize: 18, lineHeight: 22, color: C.muted },
};
