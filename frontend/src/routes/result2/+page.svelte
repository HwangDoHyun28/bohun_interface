<script>
  import { Carousel, CarouselButtonNext, CarouselButtonPrev } from 'flowbite-svelte';
  import images from './imageData/images.json';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const scaleAnimation = (x) => scale(x, { duration: 500, easing: quintOut });
</script>

<div class="max-w-4xl">
  <Carousel {images} transition={scaleAnimation} let:Controls let:Indicators>
    <CarouselButtonPrev class="my-custom-prev-button" />
    <CarouselButtonNext class="my-custom-next-button" />
    <Controls />
    <Indicators />
  </Carousel>
</div>
