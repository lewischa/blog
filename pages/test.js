export default function Test({ test }) {
    return (
        <main>
            <h1>This is the test page</h1>
            <div>{test}</div>
        </main>
    );
}

export async function getServerSideProps() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                props: {
                    test: 'hi'
                }
            });
        }, 5000);
    });
}