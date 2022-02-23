<template>
  <button
    id="nav-toggle"
    aria-label="Toggle Navigation Menu"
    class="ham-btn"
    data-cursor-hover
    :class="{ active: state.toggleMenu }"
    @click="navToggle()"
  >
    <div class="ham">
      <div></div>
    </div>
  </button>
</template>

<style>
.ham-btn {
  display: flex;
  position: relative;
  z-index: 1000;
  width: 50px;
  height: 50px;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border-radius: 5px;
}

@media screen and (max-width: 575.82px) {
  .ham-btn {
    width: 40px;
    height: 40px;
  }
}

.ham-btn .ham {
  position: relative;
  width: 30px;
  height: 2px;
  background-color: var(--color-aeswhite-DEFAULT);
  border-radius: 2px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.ham-btn .ham::after {
  position: absolute;
  content: "";
  width: 30px;
  height: 2px;
  background-color: var(--color-aeswhite-DEFAULT);
  border-radius: 2px;
  top: -8px;
  right: -5px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform-origin: left;
  transform-origin: left;
}

.ham-btn .ham::before {
  position: absolute;
  content: "";
  width: 30px;
  height: 2px;
  background-color: var(--color-aeswhite-DEFAULT);
  border-radius: 2px;
  bottom: -8px;
  left: -5px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform-origin: left;
  transform-origin: left;
}

.ham-btn:hover .ham::after {
  right: 0;
}

.ham-btn:hover .ham::before {
  left: 0;
}

.ham-btn.active .ham {
  background-color: transparent;
}

.ham-btn.active .ham::after {
  right: 0;
  top: -10.5px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.ham-btn.active .ham::before {
  left: 0;
  bottom: -10.5px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>

<script setup>
const state = useGlobalState();
const navToggle = function() {
  state.value.toggleMenu = !state.value.toggleMenu;
};

</script>
