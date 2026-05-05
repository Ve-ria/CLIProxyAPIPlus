package cliproxy

import (
	"time"

	"github.com/router-for-me/CLIProxyAPI/v6/internal/registry"
)

func getJoyCodeModels() []*ModelInfo {
	now := time.Now().Unix()
	return []*ModelInfo{
		{
			ID:          "JoyAI-Code",
			Object:      "model",
			Created:     now,
			OwnedBy:     "jd",
			Type:        "joycode",
			DisplayName: "JoyAI Code",
		},
		{
			ID:          "JoyAI-4.0",
			Object:      "model",
			Created:     now,
			OwnedBy:     "jd",
			Type:        "joycode",
			DisplayName: "JoyAI 4.0",
		},
		{
			ID:          "JoyAI-Pro",
			Object:      "model",
			Created:     now,
			OwnedBy:     "jd",
			Type:        "joycode",
			DisplayName: "JoyAI Pro",
			Thinking:    &registry.ThinkingSupport{Levels: []string{"low", "medium", "high"}},
		},
	}
}
