import { expect, fn } from 'storybook/test';
import { http, HttpResponse } from 'msw';

import preview from '#.storybook/preview';

import MyFrog from './Frog.tsx';

const meta = preview.meta({
  title: 'Example/Frog',
  component: MyFrog,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onRibbit: fn() },
  render: (args) => {
    return (
      <>
        <p>It is currently {new Date(Date.now()).toDateString()}</p>
        <MyFrog {...args} />
      </>
    );
  },
  parameters: {
    msw: {
      handlers: {
        frog: http.get('/frog', ({ request }) => {
          const size = new URL(request.url).searchParams.get('size');

          return HttpResponse.json({
            type: 'Ribbit',
            date: Date.now(),
            // duration: 890,
            volume: (size === 'large' ? 200 : size === 'small' ? 20 : 120),
          })
        }),
      }
    },
  },
})

export default meta;

export const Base = meta.story({
  args: {},
});

export const Large =  meta.story({
  args: {
    size: 'large',
  },
});

export const Medium =  meta.story({
  args: {
    size: 'medium',
  },
});

export const Small =  meta.story({
  args: {
    size: 'small',
  },
});

export const OnTime =  meta.story({
  parameters: {
    date: new Date('2000-01-01T12:00:00Z'),
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('It is currently Sat Jan 01 2000')).toBeInTheDocument();
  },
});


export const OnTimeToo =  meta.story({
  parameters: {
    date: new Date('2000-01-01T12:00:00Z'),
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('It is currently Sat Jan 01 2000')).toBeInTheDocument();
  },
});

export const Late =  meta.story({
  parameters: {
    date: new Date('2000-02-14T12:00:00Z'),
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('It is currently Sat Jan 01 2000')).toBeInTheDocument();
  },
});
