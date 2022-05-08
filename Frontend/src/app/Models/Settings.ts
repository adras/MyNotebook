import { Setting } from "./Setting";

export interface Settings {
  loginPassword: Setting;
  encryptionPassword: Setting;
  allNotesTagName: Setting;
  newNoteTagName: Setting;
  defaultTags: Setting;
  editNoteOnDoubleClick: Setting;
}
