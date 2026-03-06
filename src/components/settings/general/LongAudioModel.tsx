import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../../hooks/useSettings";
import { useModelStore } from "../../../stores/modelStore";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { Dropdown } from "../../ui/Dropdown";

export const LongAudioModel: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, updateSetting } = useSettings();
  const { models, currentModel } = useModelStore();

  const threshold = getSetting("long_audio_threshold") ?? 0;
  const selectedModel = getSetting("long_audio_model") ?? "";

  const downloadedModels = models.filter(
    (m) => m.is_downloaded && m.id !== currentModel,
  );

  const modelOptions = [
    {
      value: "",
      label: t("settings.general.longAudio.model.none"),
    },
    ...downloadedModels.map((m) => ({
      value: m.id,
      label: m.name,
    })),
  ];

  return (
    <SettingsGroup title={t("settings.general.longAudio.title")}>
      <SettingContainer
        title={t("settings.general.longAudio.threshold.title")}
        description={t("settings.general.longAudio.threshold.description")}
        descriptionMode="tooltip"
        grouped={true}
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            step={5}
            value={threshold}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value) || 0);
              updateSetting("long_audio_threshold", val);
            }}
            className="w-20 rounded-md border border-input-border bg-input-bg px-2 py-1 text-sm text-primary"
          />
          <span className="text-sm text-mid-gray">
            {t("settings.general.longAudio.threshold.unit")}
          </span>
        </div>
      </SettingContainer>
      <SettingContainer
        title={t("settings.general.longAudio.model.title")}
        description={t("settings.general.longAudio.model.description")}
        descriptionMode="tooltip"
        grouped={true}
      >
        <Dropdown
          options={modelOptions}
          selectedValue={selectedModel}
          onSelect={(value) => updateSetting("long_audio_model", value)}
          disabled={threshold === 0}
        />
      </SettingContainer>
    </SettingsGroup>
  );
};
