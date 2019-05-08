import app from './app';

const PORT = process.env.PORT || 8000;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
app.listen(PORT, () => {
    console.log(`Running banka on port ${PORT}`);
});
