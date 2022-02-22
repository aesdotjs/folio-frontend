<template>
  <section 
    id="hero"
    class="bg-hero pb-[80%] min-h-screen w-full overflow-hidden relative"
    data-scroll-section>
    <div class="clouds-back opacity-90"></div>
    <div class="absolute bottom-0">
      <img
        src="~/assets/img/mountain.svg"
        class="object-cover w-full"
      />
    </div>
    <div class="absolute bottom-0">
      <img
        src="~/assets/img/parallax3.svg"
        class="object-cover w-full"
      />
    </div>
    <div class="clouds opacity-80"></div>
    <div class="absolute bottom-0">
      <img
        src="~/assets/img/parallax2.svg"
        class="object-cover w-full"
      />
    </div>
    <SnowGL
      :count="2000"
      :size="1"
      :depth="80"
      :gravity="30"
      class="absolute inset-0 w-full h-full"
    ></SnowGL>
    <div class="absolute bottom-0">
      <img
        src="~/assets/img/parallax1.svg"
        class="object-cover w-full"
      />
    </div>
  </section>
</template>

<style>
.bg-hero {
  background: linear-gradient(180deg, #200E4F 13.24%, #500366 30.66%, rgba(130, 0, 102, 0.88) 43.34%, #DC3C00 57.33%);
}
.clouds {
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: repeat-x;
  background-image: url("~/assets/img/clouds.png");
  animation: cloud-animation 10000s linear infinite alternate;
}
.clouds-back{
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("~/assets/img/clouds-back.png");
}

@keyframes cloud-animation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -200000px 0%;
  }
}
</style>