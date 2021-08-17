# Define

- Building your own Hooks.
- Special function
- Custom hooks can use another hooks such as: useEffect, useState, ...
- Convention: Hook name start with key 'use'

- Exp:

`useMagicColor.js`

```jsx
function useMagicColor() {
  const [color, setColor] = useState('green');
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const newColor = randomColor();
      setColor(newColor);
    }, 2000);
    return () => {
      clearInterval(intervalRef);
    };
  }, []);
  // Custom hooks return data instead of JSX
  return color;
}
```

`magicBox.js`

```jsx
function MagicBox() {
  const color = useMagicColor();
  return <div class="magic-box" style={{ backgroundColor: color }} />;
}
```

# Ref

`copy easy front end`

- Official: https://reactjs.org/docs/hooks-custom.html
- Use hooks: https://usehooks.com/
- Awesome react hooks: https://github.com/rehooks/awesome-react-hooks
- Beautifulreact hooks: https://github.com/beautifulinteractions/- beautiful-react-hooks
- The platform: https://github.com/jaredpalmer/the-platform
- ESLint React hooks: https://www.npmjs.com/package/eslint-plugin-react-hooks#installation
