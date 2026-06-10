import { ref, computed } from "vue";

export type MessageType = "assistant" | "user";

export interface ChatMessage {
  id: string; // 用來當 v-for 的 key，可以用 Date.now().toString() 產生
  type: MessageType;
  text: string;
}

type StepId =
  | "start"
  | "drinkType"
  | "drinkFlavor"
  | "dessertFlavor"
  | "dessertTexture"
  | "done";

type Category = "咖啡" | "茶飲" | "甜點";

export interface Answers {
  category?: Category;
  flavor?: string;
}

export interface StepOption {
  label: string;
  nextStep: StepId;
  answer: Partial<Answers>;
}

interface Step {
  message: string;
  options: StepOption[];
}

// 靜態資料
const steps: Record<StepId, Step | null> = {
  start: {
    message: "您好！請問您想喝點什麼，還是來份甜點呢？",
    options: [
      { label: "喝的", nextStep: "drinkType", answer: {} },
      {
        label: "吃的",
        nextStep: "dessertFlavor",
        answer: { category: "甜點" },
      },
    ],
  },
  drinkType: {
    message: "好的！請問您想喝咖啡還是茶飲呢？",
    options: [
      { label: "咖啡", nextStep: "drinkFlavor", answer: { category: "咖啡" } },
      { label: "茶飲", nextStep: "drinkFlavor", answer: { category: "茶飲" } },
    ],
  },
  drinkFlavor: {
    message: "了解！請問您喜歡什麼口味的呢？",
    options: [
      { label: "清爽", nextStep: "done", answer: { flavor: "清爽" } },
      { label: "濃郁", nextStep: "done", answer: { flavor: "濃郁" } },
    ],
  },
  dessertFlavor: {
    message: "好的！請問您想吃什麼口味的甜點呢？",
    options: [
      {
        label: "清淡",
        nextStep: "dessertTexture",
        answer: { flavor: "清淡" },
      },
      {
        label: "巧克力",
        nextStep: "dessertTexture",
        answer: { flavor: "巧克力" },
      },
    ],
  },
  dessertTexture: {
    message: "了解！請問您喜歡什麼口感的甜點呢？",
    options: [
      { label: "鬆軟", nextStep: "done", answer: { flavor: "鬆軟" } },
      { label: "紮實", nextStep: "done", answer: { flavor: "紮實" } },
    ],
  },
  done: null,
};

const messages = ref<ChatMessage[]>([]);
const currentStep = ref<StepId>("start");
const answers = ref<Answers>({});

export function useChat() {
  const currentStepData = computed(() => steps[currentStep.value]);
  const isComplete = computed(() => currentStep.value === "done");

  function init() {
    if (messages.value.length > 0) return; // 已有對話，不重複初始化
    const firstStep = steps["start"];
    messages.value.push({
      id: Date.now().toString(),
      type: "assistant",
      text: firstStep!.message,
    });
  }

  function sendAnswer(option: StepOption) {
    // 1. 推使用者說的話進 messages
    messages.value.push({
      id: Date.now().toString(),
      type: "user",
      text: option.label,
    });
    // 2. 合併答案
    answers.value = { ...answers.value, ...option.answer };

    // 3. 推下一個步驟
    currentStep.value = option.nextStep;

    // 4. 如果還沒結束，推助理的下一句話
    const next = steps[currentStep.value];
    if (next) {
      messages.value.push({
        id: Date.now().toString(),
        type: "assistant",
        text: next.message,
      });
    }
  }

  function reset() {
    messages.value = [];
    currentStep.value = "start";
    answers.value = {};
    init();
  }

  return {
    messages,
    currentStep,
    currentStepData,
    isComplete,
    answers,
    init,
    sendAnswer,
    reset,
  };
}
