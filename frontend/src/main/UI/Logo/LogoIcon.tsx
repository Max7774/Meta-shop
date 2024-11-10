interface ILogoProps {
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ size = "md" }: ILogoProps) => {
  const sizes = {
    lg: { width: 100, height: 100 },
    md: { width: 70, height: 70 },
    sm: { width: 40, height: 40 },
  };

  const { width, height } = sizes[size] || sizes["md"];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 311 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M20.8438 166.242C21.7031 167.445 22.5781 169 23.4688 170.906C24.375 172.797 25.25 174.875 26.0938 177.141C26.9375 179.406 27.6953 181.727 28.3672 184.102C29.0547 186.461 29.6172 188.734 30.0547 190.922C30.4922 193.109 30.7422 195.055 30.8047 196.758C30.8203 197.586 30.4453 198 29.6797 198H24.0078C23.2734 198 22.8906 197.633 22.8594 196.898C22.7969 195.148 22.5156 193.023 22.0156 190.523H9.21875C8.78125 192.961 8.53125 195.086 8.46875 196.898C8.4375 197.633 8.03906 198 7.27344 198H1.71875C1.4375 198 1.20312 197.922 1.01562 197.766C0.828125 197.594 0.742188 197.305 0.757812 196.898C0.835938 195.164 1.08594 193.195 1.50781 190.992C1.94531 188.773 2.50781 186.477 3.19531 184.102C3.88281 181.727 4.64844 179.406 5.49219 177.141C6.33594 174.859 7.21094 172.773 8.11719 170.883C9.02344 168.992 9.90625 167.445 10.7656 166.242C11.2188 165.602 11.6953 165.133 12.1953 164.836C12.7109 164.539 13.3438 164.391 14.0938 164.391H17.4688C18.2344 164.391 18.875 164.539 19.3906 164.836C19.9062 165.133 20.3906 165.602 20.8438 166.242ZM15.5469 171.797C14.5156 173.438 13.5703 175.398 12.7109 177.68C11.8516 179.961 11.1094 182.305 10.4844 184.711H20.6562C20 182.305 19.2422 179.961 18.3828 177.68C17.5234 175.398 16.625 173.438 15.6875 171.797H15.5469ZM58.9297 176.25V195.258C58.9297 199.82 57.625 203.297 55.0156 205.688C52.4219 208.078 48.8594 209.273 44.3281 209.273C42.4531 209.273 40.9688 209.133 39.875 208.852C38.7812 208.586 37.9531 208.328 37.3906 208.078C37.0312 207.906 36.7969 207.727 36.6875 207.539C36.5312 207.289 36.3516 206.922 36.1484 206.438C35.9609 205.953 35.7812 205.422 35.6094 204.844C35.5625 204.625 35.5547 204.461 35.5859 204.352C35.6484 204.195 35.7656 204.031 35.9375 203.859C36.2188 203.578 36.6172 203.25 37.1328 202.875C37.6641 202.5 38.0703 202.258 38.3516 202.148C38.6484 202.039 38.9219 202.055 39.1719 202.195C39.5781 202.414 40.1562 202.656 40.9062 202.922C41.6719 203.203 42.7422 203.344 44.1172 203.344C46.3047 203.344 48.0859 202.781 49.4609 201.656C50.8359 200.531 51.5234 198.797 51.5234 196.453V195.609H51.4297C51.0859 196.047 50.6406 196.492 50.0938 196.945C49.5469 197.398 48.8359 197.781 47.9609 198.094C47.1016 198.406 45.9922 198.562 44.6328 198.562C42.2734 198.562 40.3359 198.055 38.8203 197.039C37.3203 196.008 36.2109 194.594 35.4922 192.797C34.7891 191 34.4375 188.953 34.4375 186.656C34.4375 184.141 34.8516 181.883 35.6797 179.883C36.5078 177.883 37.8984 176.305 39.8516 175.148C41.8047 173.977 44.4766 173.391 47.8672 173.391C49.8984 173.391 51.6016 173.539 52.9766 173.836C54.3672 174.133 55.5312 174.5 56.4688 174.938C57.4062 175.375 58.2266 175.812 58.9297 176.25ZM47.6094 179.062C45.7969 179.062 44.4141 179.672 43.4609 180.891C42.5078 182.109 42.0312 184 42.0312 186.562C42.0312 190.578 43.6875 192.586 47 192.586C48.2969 192.586 49.2891 192.32 49.9766 191.789C50.6641 191.258 51.1797 190.586 51.5234 189.773V180.094C51.1797 179.844 50.6953 179.609 50.0703 179.391C49.4453 179.172 48.625 179.062 47.6094 179.062ZM72.6641 178.453H72.7578C73.9297 175.203 76.0391 173.578 79.0859 173.578C79.4766 173.578 79.7969 173.602 80.0469 173.648C80.2969 173.68 80.4688 173.711 80.5625 173.742C80.7969 173.82 80.9141 174 80.9141 174.281V179.93C80.9141 180.414 80.6328 180.547 80.0703 180.328C79.8828 180.25 79.6094 180.172 79.25 180.094C78.9062 180 78.4219 179.953 77.7969 179.953C76.1875 179.953 74.9297 180.547 74.0234 181.734C73.1172 182.906 72.6641 184.508 72.6641 186.539V196.758C72.6641 197.227 72.5625 197.555 72.3594 197.742C72.1719 197.914 71.8438 198 71.375 198H66.5469C66.0781 198 65.7422 197.914 65.5391 197.742C65.3516 197.555 65.2578 197.227 65.2578 196.758V177.117C65.2578 176.742 65.3359 176.453 65.4922 176.25C65.8203 175.812 66.2109 175.367 66.6641 174.914C67.1328 174.461 67.7031 173.977 68.375 173.461C68.5 173.367 68.625 173.305 68.75 173.273C68.875 173.242 68.9844 173.227 69.0781 173.227C69.2969 173.227 69.5156 173.305 69.7344 173.461C71.0312 174.477 71.9375 175.344 72.4531 176.062C72.5938 176.25 72.6641 176.469 72.6641 176.719V178.453ZM95.9375 198.586C92 198.586 88.8828 197.539 86.5859 195.445C84.2891 193.352 83.1406 190.234 83.1406 186.094C83.1406 181.844 84.3281 178.672 86.7031 176.578C89.0938 174.469 92.2812 173.414 96.2656 173.414C100.109 173.414 103.188 174.453 105.5 176.531C107.812 178.594 108.969 181.641 108.969 185.672C108.969 189.875 107.812 193.078 105.5 195.281C103.188 197.484 100 198.586 95.9375 198.586ZM96.1719 192.914C97.8906 192.914 99.1875 192.383 100.062 191.32C100.938 190.242 101.375 188.406 101.375 185.812C101.375 183.344 100.93 181.609 100.039 180.609C99.1641 179.594 97.8594 179.086 96.125 179.086C94.4531 179.086 93.1328 179.633 92.1641 180.727C91.2109 181.805 90.7344 183.562 90.7344 186C90.7344 188.547 91.1875 190.336 92.0938 191.367C93.0156 192.398 94.375 192.914 96.1719 192.914ZM115.016 198C113.016 198 112.016 197.164 112.016 195.492C112.016 194.961 112.117 194.453 112.32 193.969C112.523 193.469 112.891 192.859 113.422 192.141L129.523 170.555H116.117C115.742 170.555 115.461 170.492 115.273 170.367C114.867 170.086 114.445 169.75 114.008 169.359C113.586 168.969 113.125 168.5 112.625 167.953C112.469 167.75 112.391 167.586 112.391 167.461C112.391 167.32 112.469 167.164 112.625 166.992C113.125 166.445 113.586 165.977 114.008 165.586C114.445 165.195 114.867 164.859 115.273 164.578C115.492 164.453 115.773 164.391 116.117 164.391H136.461C138.508 164.391 139.531 165.234 139.531 166.922C139.531 167.516 139.414 168.062 139.18 168.562C138.945 169.062 138.602 169.625 138.148 170.25L122.141 191.859L136.789 191.836C137.164 191.836 137.445 191.898 137.633 192.023C138.039 192.305 138.461 192.641 138.898 193.031C139.336 193.422 139.797 193.891 140.281 194.438C140.438 194.641 140.516 194.805 140.516 194.93C140.516 195.07 140.438 195.227 140.281 195.398C139.797 195.945 139.336 196.414 138.898 196.805C138.461 197.195 138.039 197.531 137.633 197.812C137.414 197.938 137.133 198 136.789 198H115.016ZM150.594 198.586C148.297 198.586 146.469 197.945 145.109 196.664C143.766 195.367 143.094 193.586 143.094 191.32C143.094 190.148 143.305 189.062 143.727 188.062C144.164 187.047 144.914 186.156 145.977 185.391C147.055 184.609 148.555 183.984 150.477 183.516C152.414 183.047 154.883 182.773 157.883 182.695C157.883 181.273 157.523 180.25 156.805 179.625C156.102 179 155.039 178.688 153.617 178.688C152.336 178.688 151.289 178.906 150.477 179.344C149.664 179.781 149.156 180.078 148.953 180.234C148.734 180.422 148.469 180.492 148.156 180.445C147.734 180.383 147.281 180.273 146.797 180.117C146.328 179.961 145.82 179.781 145.273 179.578C145.195 179.547 145.109 179.5 145.016 179.438C144.922 179.359 144.867 179.25 144.852 179.109C144.852 179.031 144.859 178.938 144.875 178.828C144.891 178.703 144.93 178.484 144.992 178.172C145.055 177.859 145.148 177.477 145.273 177.023C145.398 176.555 145.516 176.195 145.625 175.945C145.766 175.68 146 175.43 146.328 175.195C146.594 174.977 147.398 174.625 148.742 174.141C150.086 173.656 152.031 173.414 154.578 173.414C161.594 173.414 165.102 176.828 165.102 183.656V196.922C165.102 197.219 165.016 197.477 164.844 197.695C164.688 197.898 164.414 198 164.023 198H160.508C160.258 198 160.031 197.969 159.828 197.906C159.641 197.828 159.461 197.688 159.289 197.484L157.836 195.609H157.672C156.953 196.656 155.984 197.414 154.766 197.883C153.562 198.352 152.172 198.586 150.594 198.586ZM153.172 193.148C154.609 193.148 155.695 192.781 156.43 192.047C157.164 191.312 157.633 190.555 157.836 189.773V187.172C155.664 187.172 154.031 187.344 152.938 187.688C151.859 188.016 151.141 188.453 150.781 189C150.422 189.531 150.242 190.109 150.242 190.734C150.242 191.641 150.523 192.273 151.086 192.633C151.648 192.977 152.344 193.148 153.172 193.148ZM178.602 196.758C178.602 197.227 178.5 197.555 178.297 197.742C178.109 197.914 177.781 198 177.312 198H172.484C172.016 198 171.68 197.914 171.477 197.742C171.289 197.555 171.195 197.227 171.195 196.758V165.047C171.195 164.672 171.273 164.383 171.43 164.18C172.086 163.32 173.047 162.391 174.312 161.391C174.531 161.234 174.727 161.156 174.898 161.156C175.102 161.156 175.297 161.234 175.484 161.391C176.156 161.906 176.719 162.391 177.172 162.844C177.641 163.297 178.039 163.742 178.367 164.18C178.523 164.383 178.602 164.672 178.602 165.047V183.445H178.883C181.258 183.445 182.867 183.023 183.711 182.18C184.57 181.32 185 180.133 185 178.617V177.352C185 176.977 185.078 176.688 185.234 176.484C185.891 175.625 186.852 174.695 188.117 173.695C188.336 173.539 188.531 173.461 188.703 173.461C188.906 173.461 189.102 173.539 189.289 173.695C189.961 174.211 190.523 174.695 190.977 175.148C191.445 175.602 191.844 176.047 192.172 176.484C192.328 176.688 192.406 176.977 192.406 177.352V178.617C192.406 179.508 192.227 180.492 191.867 181.57C191.523 182.648 190.891 183.602 189.969 184.43C189.047 185.258 187.734 185.742 186.031 185.883V186C187.344 186.578 188.477 187.344 189.43 188.297C190.383 189.25 191.18 190.273 191.82 191.367C192.461 192.445 192.953 193.484 193.297 194.484C193.656 195.469 193.891 196.305 194 196.992C194.109 197.664 193.883 198 193.32 198H187.156C186.625 198 186.32 197.68 186.242 197.039C186.133 196.305 185.891 195.445 185.516 194.461C185.156 193.461 184.664 192.484 184.039 191.531C183.43 190.578 182.688 189.789 181.812 189.164C180.953 188.523 179.977 188.203 178.883 188.203H178.602V196.758ZM206.281 198.586C200.719 198.586 197.938 195.219 197.938 188.484L197.914 176.578C197.914 176.203 197.992 175.914 198.148 175.711C198.805 174.852 199.766 173.922 201.031 172.922C201.25 172.766 201.445 172.688 201.617 172.688C201.82 172.688 202.016 172.766 202.203 172.922C202.875 173.438 203.438 173.922 203.891 174.375C204.359 174.828 204.758 175.273 205.086 175.711C205.242 175.914 205.32 176.203 205.32 176.578V187.828C205.32 191.219 206.664 192.914 209.352 192.914C210.68 192.914 211.742 192.453 212.539 191.531C213.336 190.594 213.734 189.328 213.734 187.734V176.578C213.734 176.203 213.812 175.914 213.969 175.711C214.625 174.852 215.586 173.922 216.852 172.922C217.07 172.766 217.266 172.688 217.438 172.688C217.641 172.688 217.836 172.766 218.023 172.922C218.695 173.438 219.258 173.922 219.711 174.375C220.18 174.828 220.578 175.273 220.906 175.711C221.062 175.914 221.141 176.203 221.141 176.578V196.922C221.141 197.219 221.039 197.477 220.836 197.695C220.633 197.898 220.375 198 220.062 198H216.547C216.297 198 216.07 197.969 215.867 197.906C215.68 197.828 215.5 197.688 215.328 197.484L213.875 195.609H213.711C213.461 195.969 213.07 196.383 212.539 196.852C212.023 197.32 211.266 197.727 210.266 198.07C209.281 198.414 207.953 198.586 206.281 198.586ZM242.422 173.414C244.703 173.414 246.578 173.93 248.047 174.961C249.531 175.977 250.633 177.383 251.352 179.18C252.086 180.961 252.453 183.008 252.453 185.32C252.453 187.82 252.023 190.07 251.164 192.07C250.32 194.07 249.07 195.656 247.414 196.828C245.758 198 243.703 198.586 241.25 198.586C239.984 198.586 238.938 198.438 238.109 198.141C237.297 197.859 236.641 197.523 236.141 197.133C235.656 196.727 235.273 196.359 234.992 196.031H234.898V206.016C234.898 206.391 234.82 206.68 234.664 206.883C234.008 207.742 233.047 208.672 231.781 209.672C231.562 209.828 231.367 209.906 231.195 209.906C231.008 209.906 230.812 209.828 230.609 209.672C229.938 209.156 229.367 208.672 228.898 208.219C228.445 207.766 228.055 207.32 227.727 206.883C227.57 206.68 227.492 206.391 227.492 206.016V177.117C227.492 176.742 227.57 176.453 227.727 176.25C228.055 175.812 228.445 175.367 228.898 174.914C229.367 174.461 229.938 173.977 230.609 173.461C230.812 173.305 231.023 173.227 231.242 173.227C231.445 173.227 231.656 173.305 231.875 173.461C232.531 173.977 233.094 174.469 233.562 174.938C234.031 175.406 234.445 175.891 234.805 176.391H234.922C235.188 176.062 235.594 175.664 236.141 175.195C236.688 174.727 237.461 174.312 238.461 173.953C239.477 173.594 240.797 173.414 242.422 173.414ZM239.539 192.609C241.227 192.609 242.531 192.023 243.453 190.852C244.391 189.664 244.859 187.953 244.859 185.719C244.859 181.5 243.125 179.391 239.656 179.391C238.188 179.391 237.102 179.695 236.398 180.305C235.695 180.898 235.195 181.531 234.898 182.203V187.289C234.898 188.805 235.289 190.07 236.07 191.086C236.852 192.102 238.008 192.609 239.539 192.609ZM265.648 196.758C265.648 197.227 265.547 197.555 265.344 197.742C265.156 197.914 264.828 198 264.359 198H259.367C258.898 198 258.562 197.914 258.359 197.742C258.172 197.555 258.078 197.227 258.078 196.758V168.141C258.078 167.688 258.156 167.344 258.312 167.109C259.016 166.078 260 164.992 261.266 163.852C261.5 163.664 261.703 163.57 261.875 163.57C262.062 163.57 262.258 163.664 262.461 163.852C263.148 164.445 263.727 165.016 264.195 165.562C264.664 166.094 265.07 166.609 265.414 167.109C265.57 167.359 265.648 167.703 265.648 168.141V177.867H266.188C268.141 177.867 269.727 177.602 270.945 177.07C272.164 176.523 273.102 175.797 273.758 174.891C274.414 173.969 274.859 172.945 275.094 171.82C275.344 170.695 275.469 169.547 275.469 168.375V168.141C275.469 167.688 275.547 167.344 275.703 167.109C276.406 166.078 277.391 164.992 278.656 163.852C278.891 163.664 279.094 163.57 279.266 163.57C279.453 163.57 279.648 163.664 279.852 163.852C280.539 164.445 281.117 165.016 281.586 165.562C282.055 166.094 282.461 166.609 282.805 167.109C282.961 167.359 283.039 167.703 283.039 168.141V168.375C283.039 169.641 282.914 170.953 282.664 172.312C282.414 173.656 281.969 174.93 281.328 176.133C280.703 177.336 279.812 178.367 278.656 179.227C277.516 180.07 276.039 180.625 274.227 180.891V181.055C275.852 181.57 277.297 182.43 278.562 183.633C279.844 184.82 280.945 186.18 281.867 187.711C282.805 189.242 283.57 190.781 284.164 192.328C284.758 193.875 285.18 195.258 285.43 196.477C285.555 197.055 285.555 197.453 285.43 197.672C285.305 197.891 285.008 198 284.539 198H278.797C278 198 277.531 197.633 277.391 196.898C277.156 195.711 276.695 194.375 276.008 192.891C275.336 191.391 274.492 189.945 273.477 188.555C272.461 187.164 271.328 186.016 270.078 185.109C268.844 184.203 267.547 183.75 266.188 183.75H265.648V196.758ZM290.914 198C290.133 198 289.469 197.789 288.922 197.367C288.375 196.93 288.078 196.344 288.031 195.609C288 194.859 288.352 194.016 289.086 193.078L299.703 179.461H290.727C290.445 179.461 290.227 179.406 290.07 179.297C289.43 178.781 288.758 178.07 288.055 177.164C287.93 176.961 287.867 176.812 287.867 176.719C287.867 176.609 287.93 176.469 288.055 176.297C288.758 175.391 289.43 174.68 290.07 174.164C290.258 174.055 290.477 174 290.727 174H305.984C307.547 174 308.539 174.508 308.961 175.523C309.383 176.523 309.109 177.648 308.141 178.898L297.688 192.539H307.32C307.602 192.539 307.82 192.594 307.977 192.703C308.617 193.219 309.289 193.93 309.992 194.836C310.117 195.039 310.18 195.188 310.18 195.281C310.18 195.391 310.117 195.531 309.992 195.703C309.289 196.609 308.617 197.32 307.977 197.836C307.789 197.945 307.57 198 307.32 198H290.914Z"
        fill="#417A25"
      />
      <mask
        id="mask0_0_1"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="75"
        y="0"
        width="161"
        height="161"
      >
        <rect
          x="117.928"
          width="125.513"
          height="125.513"
          transform="rotate(20 117.928 0)"
          fill="url(#pattern0_0_1)"
        />
      </mask>
      <g mask="url(#mask0_0_1)">
        <rect x="73.9999" width="171" height="171" fill="#417A25" />
      </g>
      <defs>
        <pattern
          id="pattern0_0_1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_0_1" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_0_1"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAIABJREFUeF7tfXe4dEWRd1dXz0UQ1oCCgqQ1sKhgQAwEEVTWb2GNYF5FRRFUREHB8IkJs4g5J4ywfiAr5gCKAURBQIIiQRRUEDGx6kxX13d+l76v973MzOk+YebMfaee5z73j6nurq4+dU53ddWvyMxproG5BkZqgOa6mWtgroHRGpgbyPzpmGtgjAbmBjJ/POYamBvI/BmYa6CaBuZfkGp6q9NqvV6vt30IYXsiupOqbmGM2cQY8y+quh46JqJ/GGP+ZIy5loiuVNVfWGvPHwwG5xtj+nUGn7fN08DcQPL0VYm71+vtpKr7qOpDjDE7GmMWDaECwXDOUtWvM/Mpg8Hg7Ap9zJtkaGBuIBnKymTd0jl3gKr+lzFm68y2qeyXquonQggfNsb8OrXRnC9dA3MDSddVEmev19sxhHCkMeZRxhhOalSfyRtjPsfMr+/3++fV727ew5IG5gbS3LNwF2Z+ozHmkc11md2TwlBE5AhjzOXZrecNbqKBuYHUfyhu5pw7SlUPM8b06nfXSA//IKI3eO9fNz/U19Pn3EBq6K/X691bVT+lqv9Wo5vWmqrqT51zT5pvu6qreG4gFXVnrX0uEb3VGLNQsYtJNYPn63ki8sFJDbiaxpkbSP5qOmZ+b+E1OiC/6VRbvFdEnmeMkalKMWODzw0kb8HWZ+YTjTEPy2vWGe4viMhjjTF/74xEHRdkbiDpCwTj+KIxZo/0Jp3k/KaI7DM3krS1mRtImp56zPwFY8y/p7F3nutLIvIIYwzuT+Y0RgNzA0l4PJj548aYpySwzhLLh0Vk1s5RE9fv3EBKVG6tPZyI3jzxlZnAgKr6/BDCOyYw1MwOMTeQMUvnnNtFVb89wZCRST9I3lq762AwOHPSA8/KeHMDGb1SGzEz4praCjTsyjNymYjcwxjz164I1CU55gYyYjWY+V1FPsZzurRYbclCRO/w3j+/rf5nud+5gQxZvRiR+0NjjJ3lxc2QPVhrdxwMBj/JaLNOsM4NZMgyM/N3jDG7rRNPwD8neZqIzPodT+NLNjeQFSp1zj1MVb/cuKZnoEMi2st7//UZEHViIs4NZIWqmfl0Y8yuE1uBbg30HRHZvVsiTVeauYEs0z9yx0MIOHvMCv3RGHOiql5mrb1Nka++dxF+f+c6wltrdxoMBj+q08dqajs3kGWrycwfMcY8bUYW+GQR2d8YAyNZIrLWHkREx9ZI3vqQiDxzRnTQuphzA/mnijdg5muMMTdvXev1BzhFRJDzPjSWiplh5DD2KvQXEQEM0TziFxBMVTS4Gtsw877GmP+egbnB2/R/yh5ga+25RLRDxfk8urg8PKli21XVbG4gcTmZ+ThjDCB6ukw/EpE9jTF/KRPSOfdmVT28jG/E7x8VkadXbLuqms0N5J8G8ltjzKZdXV0iush7j7uZ61JktNYeRUSvTOEdwnN1kaK7ecW2q6rZ3EBuXM47M/PPO7yyV4gIXM9XpcrIzNguYttYiUTkjkWI/2WVGq+iRnMDQagu85OMMZ/s6Lr+VkTw5fhFhnybMTP4189os5L1CSLy2RrtV0XTuYEYY5xzb1TVFze0ogCd/kE8RG9vjMGbuCpdz8y79/t9gFanErIfkRr80NQGw/iI6PXe+5fW6WM1tJ0byI1fEAAxwG1ah7yqviKE8LblHiZmRmorsHM3zuz8BmvtQwaDwRkZ7YiZ8SV8YkabUaxAaNyvgX5muou5gSBk19qzieheNVfyaSLysWF9LCws7FB4nxAAeYvEMfpEtLf3/huJ/ItsDYfow2O2U874q5F3biA3PlhARq/jtfmBiOw87gFxzu2mql8zxtys5EECbtVjRQRftWRyzr0KX7DkBuWMvxKRLcvZVjfH3EBuNBBk01W+QVfVF8at1dinhZkfjtipMSm8AJ9+hoh8NOexs9YeQkRvz2mTwPtXEdkogW9Vs6x6A4l55fuPiy9iZoRs1ClV8JjUN/64MJBUQ1v+RDIzLjeButL0WnoRGQnGDUeAiCALMce7NnPG1LRSu6SAWzPzW4wx+6vq2SGE+4wSjpmxramTPYi3fnLsk7X2xUSEUglriIhe473P2iIx83/GL5JrQfFBREa9NGzU2T9U9XUhhDesVhT5VWkgzAx4zXfG2n8GKOeoCTjGQP6WcDYY9wweLyKPz3lIV4SCvFNEDsls/0BV/WpNuccN+TcR2WAEAwI7b1j6TVUvYOanDwaDWUoVSFL3ajOQjZn5PTjkrpj9lcW+fqsxBnKtMQb5FFVJrLX3z8yjgEsWZw2KYes4fyRRr9e7VwjhNBT+TGpQjekaERkVenM7Zv7Nim4FX0XvPcJbBtWG7F6rVWMgzrk9VBV3AJsNUfO4tyEuCi9qoMYHbrwRDnJpxjIvbY1yIEARFvPdpa9jxlhZrPgqhBDuPqzRwsLC9iIyqtQb3MO4h7kka8COMq8GA7HOuVeq6svGnSNE5NbGmOuHrQMzw/1a6+Y59nu5iOxijFn5dm1q+e8QjWPk17CpgYwxX4lh9TfpkpkRbv+lMWPBK/gsEflMg/JMpatZN5DbMvOnjTEorzyWIqzN0LLJsd7Hs8v6SPk9nnceOMoYU/oYwbOxc+50Vd2uRh85Td8jIkNxwWLxIJzxygh9HDrLW66ZNZBer3ePEML/FJlzqZdZTxz1RstY8LIHYul3XBzCaP83tUEJ34bM/C1jzMRutlX14BACCgUN+4IAzxfFeFLouyLyGGMMsjVnjmbSQGJ806dyLvdiUcuXDFsh59zOqvq9hlfvqyKCi8F+zX7Xi8GHD67ZT1bz6HQYitlbBFCeaox5UEaHv2Tmffr9/k8z2nSCdeYMxFr7fCI6psK9Baor4YEdRngIEYW7XsOrcoKIPMEYEyr2yzGvo24gZe7wcGogbmyoN4qZqySX/ZmIHl0kfX0zV5hp8s+UgTjn3qSqL6qgsM+LyLMKrF24c4cSMyMwsI239PtFpNL5hpkRBTyN1Fd8/caVmdsu1kzJ3fLB4J4yS3kms2IguLl9f4XCmX9T1UNDCB8oMypr7Qvil6mMNfv3KrkVNXPKs2Vc3iCxboiL9eGRM5IThRBU9bmjzje1BG+h8SwYCLYZiDVC1l8yEdHPrLX7Zux7tyzipH6ZPEAmIwAUQggoG11K1tojYVSljO0wqIhskZre65x7kKrCnXu7HHFU9bAQArbKnaauGwiMA4fxx2Vq8SQRQcm0rJoXEwCtfnpZpK619llEhK/ltOjUiJySM/6mzHyCMQbu7WTKeWkkd9owY5cNBKEY+HLkQPGoqr4qhPBqY0xy6MaSTos87icXKbKfaFjHy7tDUOTjReRzw8ZgZsRz4YWQs2VpWtyR7vCSgVA/HiH3B+cIpKqHhBBS7lRyum2Mt7MGEmOqDsqY6T8QuVvzALjAzFcYY26fMW4uayCit3rv32SM+X1svIlz7ghVfUELYes58v1aRP61zsWetfY5MTclNX0ALzJkY+Jl2DnqpIFUwHT6IxE9wnuPtNZaNCwUvVaHoxsjuG8RVkdV8VCmPlAtibMoR1LiV5kAuPMwxhxvjBkVDbyyC8SiPUJExoWvlA3byu+dM5DiDQ5A5pyMut8y816ZyB/jlIlQbjy4nQWRa+VJMOY3EQsLof+1yTn3AFUFusqtEjsDSMXug8Hgx4n8E2HrlIFEjwgCB0dmsq3QCvKmAcXZaFZbBw7KE1n8FYOUOhByhYpgFSjIAzDsFIKR3q9IO/5VCvMkeLpkIP/KzGcZYxB1m0IwDoQ7tIH+Z621PySiHVMEWQU8Z0TQiWzHRsLc7xpDU5KMRFXPCSEgbaCpOLYEEUezdMVAbm6t/QERjcz6WzEFYMfCpZiTe5GlqF6vd89YTCf1a5bVf4eY+8x8nwa3qDeZ2sLCwt2LlxkSvFKxwT4tIln3Xm3psxMGEu86UsHOrotQnBe1pZSlfq21LyWio9seZ5r9q+oRIQR41FqlWL0LEckbpgzUFffv1A3EWnsgEb0vRWnGGBzk9pxg7jNCXFDQc69E+WaN7csisneVO6MqE3XOPTQe3FO+yn1r7a6DwQDb7qlRHQPZyjl3gKregog+470HHm0WLSws3E1EUA+vDEwN/eKS7ZEickrWIPWZkeeOsO86GLv1pWi4ByK6xHuPA/HQLMuGh1vTHTM/1RgzFIFyyJiXiggQL0vroaxsy8yIvnhdRLPElg1Brrgry6KqBrJ1ATkDd9zSgRoP774i8vmM0dez1p6Veu6IQYdNg6OlinuXwpX8/Yw9dGq/0+K7Nh7KG/X+pU7GOfc6VR2amzOkj+NEBEaVTM65XVUVZ57ld0vvFpHnJncSGSsZiHPuaFVdifyN2nYIf/5ZihCZiOpTLyzZ6/V2DCFgD90mkkiK6ury/Mlau8dgMDinbkc12mPrimxQbO9SKBmYDy+xAsESqdUrM03/HHNcUsZbw1PJQCJcDS701iIiujh+tv88ToroH8ckUm6Pz4weq7qZeVmKGcYcD5rAokq9/Ko9ZsMdXGet3WswGAzNzW94rLLubhl3IYgiKCNAEG2T4PpFPBjWB3djNyERwVY+a5tV1UBQWGVUhO2XYuYetl2jCFG67y7QPw4s0Qw8VtiDdubiKJ6bcEM8CWSRsgcn53cgrvxHESx5cU6jNnl7vd69Qwg4uy6MGQdJVs8pSsJ9sESWJZyxkdsxEQH2WVIJu6WxqhoIPo+AvRxFIxExljeIgW3ICRiloH2KbRsexq4RwrtR4gyVn2aBEMKOF9rIjMppTcJaeygRoabKMLqq2JU83nsPHLCx5Jx7K2LJxjFF8MAry/pa/ntVA0H4wFionVSsWbxFigjS44jobisEz4bjzJl4A7zIqHttTAGeZnj6uKkgchiVoo6KXsAGpt14F3jzY1u0EpcMcK6AHSp946ce+kUEkElZX9CqBgKLBkDaWCKit3jvU3LIF6y1hxMRPBsbxoqu9y6rBV42/iR+d87hRv9DqnrnSYyXOgbOg0hR9t43jdaSKkIOHwDxgHiCK4NL4LFMjezNSU1m5nv0+/1RiJBD5a1kIJkVmT4mIgckvsE2RV4EEX12gpeBOQs5ivdm0cCPzIEiamLgIX38VVWPjvVKsg6kLcmT1C0KqarqrUIIyKZMwfbFORaJVsk5Q9ba++ZePFYyEOfchZkIf4DcwR64kVDqJI1PhwkGfqSqAkElNReiKUlvQESC9x5lFTp31mhqkrEfAOnBUZTqJl5sRkS7eO9xn5VMVQ3k4iJRf9vkUW5kBMIeikICU2m108YxZP6ZRXEbuCfbpMtU9YMRueUPbQ7Ukb63tdb+d+oF83KZiWi3lAP/Wm2qTLoGGjpSTA8oXLcnVxl3BttQvNXFiwFvuxSff8o0LyUiePdOiG/ENsLUU+SYKE/EDAAcalLA40rhiOiB3vvTc4Su+gXJ3WKtlOkDIoL8607E/OcorCYvcl6Q64BqV0s11FE8dJQXDIiMVyEhjIjOV1WUFoCD5PKacsxa89szMwJaRyFjJs2HiHbPTcuuZCAF3tRPh7hlk4RcYoreiiNE5KSshquPGdEEyJO4xcLCwiL0ab/fx+EaUKhwcY67cF192lh7RnB+vHDJu1l3skS0a65Xr6qBnE9EQ4urVJjEmUR0pPcewWVzmmsAGoBhHEBERxQu9Ds0pZJxgNyjxqhqIOcS0Q5NCR77weXju6L/O6fiUsNizLubogaQQnGgquJa4LZNyzGuRkyjBsLMKNaYC1ycOt/fEtFx3nsgm2TdeqYOMOfrlAa2KdIe9i4uh3ENgMvnSi/tlBmJyF2LGMKsTNRKwsRiLnukCFWTB4AMQF3/RpFmC9j8dcGNWVNlnW7uer3e3YrCR4iS2AVepUlGIIjI1gVIXRb+clUDgZu2lkeh4jJicucVdSbOU9XzrLVXDAYDBJ/9blJpoxXlXleawf2Ky9JNVHWz4n5mc2vtVqq6TZF1um00hpR021b0JSLYti2hWSaNUdVAgB+bCrKQJEhNJnh9fh0NBbfI1xLRNSGE64gIniDkQVw7GAxQBgwFNv9ec7x1qfmter3e1iGELeIDfztVxYOGv41V9TZEhMxShJI3XYCoUT2LCKLGU8JY1oxb1UDgky7L5Wh0cg139iciulpVL4O7OYTwC2vtz7z3SCOeaI52w/Oq0x0D6qhwktyXiJCDAy/lv81wcthKXYwtBd7oIT0ngrLOik2hrcb7mTNRszCEgNtqfJlWK21RBJ4+nIhQ1hlRyRut1okWZamBpYZL2Syq9AWx1iLi9g1ZI80mM0I4zlLVk0IIKFkwFZCDhlV3c2bG9hj1U1r1GjUsd63uVPXcEMI9czupZCAFuDOU20m4+lwFZPDDWL4cSxcAvGHWCIfnw2KkMQp0rmsET+jKpKxSHVQyEOfcXqqKLLB1koAfiy9o4VdHVaWu0y2ccy9VVdQ1X7/rwrYo3ydFJKcY06IolQxkYWFhexHJysxqceLT7Pq0mBZ64TSFGDV2LCUBWNHGb6W7ON9xMhHRG733SGjLokoGAoUzM1ymczJmANAB7z3Kvt3QEYVszswfWcWQqdlqror1W9VAkGiPUPUUyNDsycxiA3i/rLWP6vf7F0xT/gImFR6p4+K9xDRF6drYqGAFNJ4sqmogxjl3gaoitmVO/9QAquqiTuL/m4ZSrLUvJyJ8ySqv6zTknsSYzLx9RknwNSJVViQzA4f3EZOY3KyNEaF2Xm6MQcLTJKjHzB+KrttJjDdrY6D2O8JgshP0KhvIKr4sbGrxTxQRlHXOCm2oMPj6zHyiMeZhFdquK01QjWwlVm/S3CsbSGZdjyRhViETjARh3G3lt6DgKG77UYpuTqM18HURqVTjpbKBOOd2jxDz84UZr4G2jAQ13WEcYxEu54uzCPcDL+NYWNJReqpsIMihZmYE9tXpY11Zv8/FL0lTZxJ4EYEL9dh1RYE15wnHSaXIj1oPNzOjiGZTUDY1ddDt5kT0Zu/9i5uQMhWLtomxVkMf1tp7DgaDc6vMpa6BAOF83yoDr6NtniQin64zd2bGV+P4On2sY20R5o6iR5XOgbUMxFr7EiJCHbg5pWngb9ba3QaDAfJOqtCdY9GZ1RyWXkUv49r8IJabq9RvLQNxzu2hqpOObEXNCAA03y4WaKw08Sk2gssRiDB/zJShF2vJ75jZblrsqAiGdGjk0yCLE3cQ+PpN1LgzKgwM1VMtA0F0aDyoTyrVEmWLUbhnCUwNlz9bMvM2qnrHAhUeGXCoMwLUwi6XSftwRLxPfnittUcR0SuTG0yOEQ/+T4AVoKo/tdZe5L2/JCJCruWUKCmW05bElUJMloSpayCGmb8zqUpLmQfdrZgZ6aP3DyHsTkRIlkmpidjWQq3VLxE91HsPxJYU2o6Z8RCOK1WW0k8TPMj5P1VVv83M3xsMBqjrkYT+mFm4tQlZQyy7VjmNuraBOOderar/t4nZJPSBW+kPEtEnK9Rlh1sadwao0wdEFoAMTJOuEBHkfZdGADMzII+GFqacxATil+EkIvrCYDBAXfscsOyNmPnRBcYZogomfdsPLONa+G1NGMiDVPXUSSzUijEuLeBkPh5CQFH63CKfHC86kRkJL9zNpyA/LrDe5L0HvOZIKkoaw5ingYZ/NRF93Hv/yeLskJ3v4pzDc/EMY8xjppWoBQeS9/5ldda2toEYYxAoh9yQW9YRpEZb7HO/bIxB4VD8z3m7YdgNrbVPtdY+r0LNkxpiLzaFCxL3SCNrplhrm8RBTpEX6PFvi6Hhua7RjQqssv2ttc9V1bukDNYmT5WCOSvlacJAcA7pBE4WEf08hHBsCAGwpbnYVyhuvy+2iw0Cc6esP/CIkQ47lJi5rKJwyhgpPKcR0Sty62fEjjd3zh0a891x59AF+r2IbFo3oropA+na5dXvVPWYEAJqsZfu8VesJgwFW4PXFl+lTSaw0n0RQQHQoeWJnXMPVtXUw3y2uHipqOoLUotmrhgAxTdfWsj+9A6Cxn1IRFDhqxY1YiDwbTMzvBuTcvemTvqaWNASVYlyw85vzczHGmOyE/1ThVvG9z4RGVWMEnFXcJvesUK/45r4uEc/GiVJMvu+pXPuZar63K5mlRLRw7z3tYFFmjIQbLO6HHYCPKvDqqRcMjPC1ZGMVKnsV+KD91cR2ayQ8S/D+K21LyMifNGaoiuK+4rHVagkbGPtRciCoj9dpd9FkLgk9/O4STRpIKjBd0pXNRbl+qKIHDxqOzNGdtxDwAGwVVvzU9VnxxLIw4bYusAiA9J9E+t1qojAc5eFlN/r9e4RQvhgi2UvGlNtnfD2lUI0ofClPlG3GmEFCAHpMiFM5fAxD+Mo2W9fFOT8Rlt5+MDaimUBho7PzGcU3rr71VQswu6flLmlYmvtkUR0FDyWNcefSPMqdUBGCdakgQDI4Y2q2khI9wQ0ebKIPC0TrHqL+KBiO9Q4WWt3ihdxN+nbWns4IglqDArjeEJmVOtmMe9ktxrjTrrp6SICnOFGqFEDiXFR2Ap0JqSjREuXA6onJ1cgbjUQXtO4O5OIjvHeHzZC5m2ZuWrFrW+JCOCAkg/jzrmdVRW57nCVzhLtV0QoAEe5EWraQHBYR67CLGW6AarncTluTufcQ1T1Sy1sOX4RXb6jtlnwZt0pZ+XhxvXeY2uWHD0cc06ArdU1r2TZ1C+P+qt9OF8aqHED6fV69wshYL88S4Qb46eIyGdShXbOvUpVX5HKn8onItuNqs3IzO8pigSNcgcPG+J/YyxScqhIvAP6wJja7alTmTgf3M7x7quxsRs3EEg27eC6itpByMoTiwc0NVsP+Rk/JiKE1jdGqnpECAF4ujchZkZcU/L2QVUPDCHgYU8iZn5yRGVs5blIEqI6E+p/4K4oN4Ji7IitKKLX6yHE/AfV5zq1ln0i+g/vPaJnS6nX690nfi2bPHN9tyhYOupQvAkzox5jCiF3BpHLSeSc21NVv9LCtjFp/LpMqvqcEAK+sI1SKwYCCZn5C8aYfRqVdjKd/UFEkLV3Rcpwzrk34K2fwpvIg9AT1O8Y+iZ0zv0sIRDwhrhVS41yRsgI8k26fPk3Un3ARfbeAwY3N7iydElaM5CFhYW7iQiU7kql6B7DGSKC6kspMD0bMvPlTeaXENGu3vvvDVMLM+PwPDb8RVWPDCG8MVGtiD1DukJjrtHEcZtke3jxUsMLuXFqzUAgqXPurapaCbCr8ZlmdqiqB4cQEMNVStbaFyG3o5QxkQF3SSGEoXceCMsvqsq+Y0xX8OTgoI/Kv6VkrT2YiBDUOauE6IjWdiqtGgjil6LvPrt4YgdW65p46IMbuIwAAQqMsKaiCD4vIo8aNmhxm7+rqp4+RqAnF65OpB+kELIsIfdMbq0QqS0iwCD4Zcpkq/C0bSA4iwBkIbsuQ5XJNN0mhqS8NaVfa+0hRPT2FN4EHgTbjTK2f2HmPw3rg4gAmIA03pStobHWIvcF5RJmklT1oBACSpK3Rk0ZiB23KMw8q3XVrywgK7dJfODWY2a8yRq5eY4GMtRjxczIHdliyFPxXyKCFNkUArYvDvGTyHlJkSeX55SIcDOq3dhnMnWwRgzEObeL9/6iMRGiGzjnzp5CSmuqHsbx7Z16y+6ce62q1sqBXhKEiPb03g/N9Wdm5DmsRCv/ZWEcuGVP8uTMOEIjXlz3NsZcN2rhmPlRInJS3QegEQMxxiBO6IUicuAYgRAyjhv2xmOY6iqhpP2nYwRsyjAIZoRHq/a9yDi/PjO/0xiDZKU1pKovCiG8JUVI8MywG/7vEZ0S6CqjCFhpbxGR2iFPTRkIgBv+SkQPGZfTzMzwNgChA5+/WaG/iAgOsUkZiQ1W3nq3iKxlBEsKG+LJAvgDHCGp+E/IAP19R3C2cp4DAHI8vqT8NjIwv0ZE53rvD8/pfBhvUwYCl+7FqsoiAoC2kXngQLwgIrwBZ4bGbXdWTqLBGvJIbBqKhRVfNMv9/h8Xkf1TFTpFKKFUEYfyqeqhIYSxjpBlL4+niQggoWpRYwYS8wYW01PLkuVnDfQa6a7e+1RwPLzBkOJbtyzEr0Vk2EHcxEtYIBouEhHt7r1HCH4SOeeOVdXnJzF3hGlcjNqSiL1e754x9AcOk7s3UXG4MQNZcVlWCvM/Y0ZymojskfqsNFS/Q0QE4ebDQreXu3pxMYggvWQ8MGb+4SykzkZ9a6xx/q4S/d+y+LLiXAJdYFsMnLYkd/e4fhszkBjsthTk97/W2p3LEpEKdyXgYt4/A+EoWQqPSVUIs6lFsfDk0HiqwinyZ6DJVEAPdDgvzkiuB4CxkYZQVlYb6d7AQ1iCNh25Pc1dkMYMJJZkAxDA0gEcrjgk6oxEDYSwsYQCyol12h8fE3GwdUqieCbbNol5BNM4ZMCloMWiwu0O/X7//Ixx7srMF2TwT4UViV7W2n1T5sbM+Lo8Z9mWszbk6Jq+mpy9tfZsIrrXUp+q+pMQAiqwDr35XTb25vEMs2uT8jTcV1ZAXEMJVch0PGHYPBBgSESbe++zID5xP2CMQSptl+mjInKIMaY0zGcYJBIRPdh730jdmia/IPgaHAOUvhWa/76I4NM3FPNpGS8wlw6N+E/rd231MC/AmmbIVftNPS7UhZlPIKIrcuseWmsPQ1GZjHlMkhWoOAeJSBJ8lLX2BcjjXyHg30UEtWEaSZxq1ECY+RHGmM8P0SjCxwEakJIXjTJjcOWBvzOEOCvv/aE5AtUtcjquOhIuC4nohFwsXefc2+AuzZnHBHiRqPYO7z3iwspepIviWGuPIKI3DJENABUPbkrmRg0Et+TxAuom+Emqen4IARlueEuUEjPvjQdEVVE1qgt0QizlnCwLMyOMHEB1VQlbDTgybkL42oYQcJ+UBVDAzCgiCvifLhA8b9ArwnMQVZxC1jmH52LlTmWxbW5EQdmATRtIWT76b6y1ew8Gg3PKBIu/wzsBoDOAIzSNTZubBZjtAAAOy0lEQVQowhq2LFcvWg250Msd839EBF/lYXSH1JfN8sbMjLTaf88VpGF+uF9PYuZX9/v98zL6Rnj+J4wxiBAfSrnOlLKxGzeQEfvC5XLg4PX0Io4fWL6pBEMBXCYwo2pVDEodcCWfqp4bQkCUQA4hTwSevarwOd8TkUYdF0WVLdT/QLbkNAgRFp8oUorfVgBk/DxHgF6vd+8i1fjT4wJeiehC7z3yQxqjxg0Eb/p4k1wm5H+mHsaWd4TIYaB1GGP2mzCy+GXxQq5sXmv9jrggY8xDsxpFZiK62HuP7MDGKCKxIBJ2YoTtNUrnhRCQLlzm0RwmF74cVxtjNhgndIU7oVIdtGEgOEABDqdsEb4mInU+9bey1j6+8Jc/Mb4RW5nLMg0CViY7M7Km1+haEWn0fshae17TUEUjnjKUcIOn7ZM16sIvdp2ajBazC5MxwEqtoyG08JuMk/hQaNwvph7Oxs1nS1wqEdEjo7G0ES2MFNzsZKher7dT4ZxAaEcV8iLSKGB0ywZyafFiRPboiRF0Ijn8ZZxynHMXqurYL2m8c1tzB1dF2cPatPXWBYwMst7G9p9Z1jl1zrct8k5w74KvE7Y2Tb2BUdLrtqlCLOPD+Qnu7Ur1RUQEd0KN+PTj2/icWBK7wlRu0gQu2e+gAlYIAUlcSJprlGIx0NIisap6WAhh5Z1IbVnaMhB4cFA2rMwfjYcO3pgkBI4KsyVEvhaZeaiTvrsx5gFFtDHGq0K/FZHbV2k4IgMwqatolMjdaISYGYB+96/YGc4BZ6jq95n59Lh1ynIz546biPU8iJHPqaB6yWK0aSCpdQsPKCb34WSJ6zMirOV+Rc3vHVUV5yR4plLQSBBbVqmATp0KUTEnPgnELkU1iU4DuGGB0n8+vHdEdE4BrYNIWRjIJGkbZoa3qwxb7XgRQR32xqk1A4nloXEpWLbFgXcIQX1JudSNa+DGDm/jnLt7CGE7a+22cCUS0R1VFQaxAIaIGAL0vmxyzu2mqsn5GssHYObt+/3+mtyP7MFXNFj2Rsa2DesDoInLVRXnh0vwQPb7faDIN7atqyozM6P0HQqqjqXcfJiy/pb/3qaBIDbr9UD5SxCokeyvhHFyWXDYR4ljGMoG3nu4bKsQEniwX88+cFtrHzAYDJpEy8fXEunDIwEPqkywhTb4evysTGeq+tMQQqMA4hMzEDxcEcSg7MFAXQyElLS6n21hEZO7XBnpnNow5vkngWmn9jkLfMyMeogHJMi6f7EN/XgCXyWWVr8gkCgFSzZK3upEK2mnwUbMjMSwZ1XostKFaoVxutQERUtx9ih7sf4qXt4mAWpUmWDrBrKwsLBDAaN5boJwwHWCr/tvCbwzx1IUOMXbEG/FXNo3IaMut89O8yOUP0ZKjJWzLdfuJLdYi2MxMy6PRgaYLQlERK/y3r+y06tXUbgIKJAapLl8lNL8/ooidbLZitTtcTICnhXAGEjLbY1a/4JA8vhwnF12cQjPSfyKNObWbE1z+R0jFxx55LnJYAjs/Gj+cDPZwllrf0JEpQGHKRBATWhgIgYSvyJIvH90gtAniUgKX0JX3WKpgiaiqs+uUNO9WxNPlCZmlCLSt4xw9rhzixfMa8afmIEUiTFIQUXsfyksJxE9zHuP0IVVRcyMC9GhCVCjJgr8qhDCuHogq0VHqMmOQENU1yqjZxSILx8pY2ri90kaCM4iqVVaAZoG33ZKim4TephIHxlvyDXyjCumMxGhJzRIajiOqv44hHDfJjCvUqY2UQPBjXWRIYhbWoB6ldGnRARVV1cNOecejMC+nAmp6stDCEfntJk13pwqV+PK07Ux70kbCGL7hyFRjJrbfiKSXPa4DQU13OemzDwWJ2zleAWs4FEhhJktcpOgv7sUYB/w7o1Nhor9TPylOXEDwRmkyEs/azl+1hglXlcYCComZT1UCYsyNRZmvsYYkxw2T0Sv8d4jJ381Ejx7SAEGwGAZofow7smgv4nRNAwEbl/UFz8zsQwCwBKQ1zHNYMbGFoSZv51TUZaIXu+9f2ljAnSoo0wQ7anE603FQLBGOcqpgknVoedgLVEyYowW27WUVDZ19TDzU4wxqTFU34gvyYnLPTUDwYWZc+6cjLJsADEG5MtMk7X2cDz0qZMAcqD3Hmguq4biDgKVem+WMKnrRWSHKhBHCX2XskzTQLDVQr729xMSYjARlN7aZTAY4EZ+Zim3eE1EHJypWh4li7NJLFMwtPbJkLZPKCK9AW4+FZqqgWDG1tpXIAYrcfa4HwGmE/LdZ5VQz/HiDOFHlmLL6KMrrBsyM0L3cY+RQhP3Wq0UauoGAhth5q8Xyf9Dy43dRGCin3vvAaZ2bYqGO8iDeo6IWC6NKIiyv09EDurgPHJFQtnpLxpjHpLSMGZwwpBKEd5T+qvK0wUDgey4H4AvPAkUQVXPDiGg4hOC/2aOYhLZ1omCf6CkenBiN1Nlw0vweGMM0DFT6Iai9DaMo1GMq5SBu/gFWZTJOffAeMtcliSzNIdvx7IKU8+dzlU8M6N2RWpJt9Kaj7njT5qfmT9gjHlmxrhPLHAKPpPB3xprV74gixO01h5IRO/LmO3XRQRgca3mBGTIk8SaCkYQO/uIiJQCFyQNPHkmfDnem5NJSURHe+9fPnlRh4/YKQOBiKh7YYwZWh98hNJQoGfvWQpszIQB+piIPK0rD0yGHDhrAYs3B47ncyICuKhGEBkzZB3J2jkDudFGGDXAkwvoRNhJIClONAyh6gIUaB2oz4E6HSl0nIg8NYWxQzw3K8owI4YOL65UOjPWhe/UbqCLBgKF3jy6A1NidBYXAEUfvfd7RZyn1EWZCl9EqEcMUgpN3dWZIuQyHpRjPskYg9qUSRQ9Vrt1EYqoqwYCxW7snPtuZoWpa4loX+99JZC2pNVshmkrZk5NK/6MiADBfhZoO+fcyaqKbL9UQnYg7raGlrtO7aQtvi4bCOYMEOzTMqtLDWIWHg6HXSVEsQKPOAWF/rMi0pWSaSP1GatpfQpl+DKU/hsRwZcmq5hORv+1WbtuIJjgFtFIgGCRQ+8XkedFFMGcdhPhZearjDGbJQyWXRsxoc9GWay1R8L7lGjwS2N33jgg6CwYyJKRAAI/t07hWSKCGofIYuwUFSUaACeacsaCZwfVtLpIuOBFbjiKs+YQihHhHqizX46lycyKgUDe2xU4tV8lIkR25tANEWAMyIadoXiQxR1OGZ0oIo8pY5r077HkN4DwkpO/Ft/IRJdEZ0rqGWzSU1trvFkyEAgODwmKzFcpQnlKvHDrhCs4A8CiazBI8DAem4ibu9bDpqrnhBBQ3KgTa5BiebNmIJjT+rEUcJW3KgrRHBkhY6Z6GZURxXxyjBZIWc9WeZgZXzwYR5U6KV+JdeZnKn5uFg1k8UvtnHtdYmmFYQ/NGUDSyKjX3viDZ619FhGlbPu+ICIPb1yAvA5RuRjYXLlnjcVRYk7LC2cRvX9WDWRR8TFtEw9ZSmbaykcCVZQQSo64n+vznpf63MwMrGJgFpfRF4vqTvuUMbX0+wbOuSNU9YiKtd77qnrILCNDzrSB4KHo9Xr3CiEgrCHXDbz0TP2JiI713gPyskoN70rPZq/Xu38IAfUCy+jLIlLpzV3W8Zjf17fWHkREMIyyCmGjurnSWrvfYDCoWuG3hvjNNZ15A4mqwOEdAAB1tiLXq+oxIYS3G2NQDaptwrblFwmDfDWG9Sew1mZZL279XpKamzNiRJw3APrX9SpWpQpbLQayONGI0PeWCgjqyxV1HULuvfcIu0cNv7boFrE8dFn/k0D0uI219plEdHCNKsCYx9+xHQshICJ7qk6QMqWm/r6qDCROeltr7adQxTZVCSP4UA7uZCJ6t/ceCU6NUww3WSwSOoa+JSJl5bQryRbRRRBt8LiKZ4w140YXLr4aU88CrKSMEY1Wo4FgqqgzAXidoyoe4NdSFxFdGEI4LoSAykeXN7UAEYZ005L+kDmZHBmbIBsuXPcrLuwQYZByk1/WJb4arwkhAMqotVJoZUK09ftqNZAlfd0ppnumprem6PlHqnp8NJZa6CrOuQuLvgCnOY5OF5EHpgg2hmcTa+2+haEjGQlh5SlBkilDAvUSdRc7F8qTInwKz2o3kEUdMDO2EG8yxmyZopRUHlU911p7qqpiGwRI0axLMGYGeBoQWsYRMiZzIwcAyod+9yzqswMtBtvNVBSVlOkjNP3F08SrShGyCZ51wkCiouC6fDERvQgJWU0ob0UfOLP8mIi+A8NBsaB+v3/RuG1HDJspy7o7Q0QeMEZefA2AkL4D4tQK4AsYBvjLzjZVVIC4tjeHEPCyWZXFVlcqZV0ykKW5b+qcewlKm9U9mCY8YchNuZiIziOiy0MIVxHRVYUr9erBYHAVMx9jjCnL9fgR3LwLCwubi8jmqD2vqpsTEb6GCNxEPb/cuocJoq/F8g8ieq/3/vWzFEeVO8lh/OuigSzpAXkmQE3fv4mDfBOL0cE+AKn0URGBYXQy469tna3LBrL8i3KIquIOIKXyVdtr0oX+ryei93jvEX81M5G3bShubiD/1OqG1lq4PhFicY82lN31PoEOU6BcvjeEgNTZG7ou7yTkmxvIEC0753ZWVYC1IaQ+perqJNaqrTEQf/Y5Ivqw9z4lNqwtOTrZ79xAxi8L8J0QSYsvC3C32j4MT+ohgQfqK8YYQAohAQ0AEnMaooG5gaQ/FhswM0rBIWkI0bVVo1zTR2yW83dF2YEvGWM+X9yrAE1/nXDT1lXh3EAqanBhYeHuBf7WnkSEOKmdUeK6YldtNUN5iO+r6jcLYPBv9fv9C9oaaDX3OzeQ5lZ3G2a+LxHtpKqozHtXQBY11/3InhA1CxfshUR0gaoCyQUFUmcCFGEC+qk1xNxAaqmvtPFGvV7vLiGELVV1S2st/gML69bL/jaKt964+V66/e4bY5b+kJvyh6U/Iro6hHAlESEh6ZeDwQDQOVMtMlOqhRlmmBvIDC/eXPT2NTA3kPZ1PB9hhjUwN5AZXry56O1rYG4g7et4PsIMa2BuIDO8eHPR29fA/wcgCdW5XcfyAgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
