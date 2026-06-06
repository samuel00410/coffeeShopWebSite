import type { DirectiveBinding, ObjectDirective } from "vue";

// -- 型別定義層 --
type Effect = "fade-up" | "fade-right" | "fade-left";

interface AnimateOptions {
  effect?: Effect;
  duration?: number;
  delay?: number;
}

// 支援兩種使用方式 :
// v-animate-on-scroll="fade-up"
// v-animate-on-scroll="{ effect: 'fade-up", duration: 800, delay: 200 }"

type BindingValue = Effect | AnimateOptions;

// -- (資料層) 每個 effect 的初始位移 --
const initialTransforms: Record<Effect, string> = {
  "fade-up": "translateY(40px)",
  "fade-right": "translateX(-40px)",
  "fade-left": "translateX(40px)",
};

// -- (邏輯層) directive 主體 --
export const vAnimateOnScroll: ObjectDirective<HTMLElement, BindingValue> = {
  mounted(el, binding: DirectiveBinding<BindingValue>) {
    // 1. 解析 binding.value，套上預設值
    const options: Required<AnimateOptions> = {
      effect: "fade-up",
      duration: 500,
      delay: 0,
    };

    if (typeof binding.value === "string") {
      options.effect = binding.value;
    } else if (binding.value && typeof binding.value === "object") {
      Object.assign(options, binding.value);
    }

    // 2. 設定初始隱藏狀態（透明 + 位移）
    el.style.opacity = "0";
    el.style.transform = initialTransforms[options.effect];
    // duration / delay 是動態的，用 inline style 控制 transition
    el.style.transition = `opacity ${options.duration}ms ease ${options.delay}ms, transform ${options.duration}ms ease ${options.delay}ms`;

    // 3. 建立 IntersectionObserver，threshold 固定 0.1
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translate(0, 0)";
            observer.unobserve(el); // 只播一次
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    // 4. 把 observer 存到 DOM 元素上，unmounted 時才能清理
    (el as any)._scrollObserver = observer;
  },

  unmounted(el) {
    // 防止 memory leak：元件銷毀時斷開觀察
    (el as any)._scrollObserver?.disconnect();
    delete (el as any)._scrollObserver;
  },
};
