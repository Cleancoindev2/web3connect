export interface INetwork {
  nodeUrl: string;
  chainId?: string;
}

export interface IOptions {
  scope?: string[];
}

export interface IWalletLinkConnectorOptions {
  infuraId: string;
  appName: string
  appLogoUrl: string
  config?: IOptions;
}

const ConnectToWalletLink = (
  WalletLink: any,
  opts: IWalletLinkConnectorOptions
) => {
  return new Promise(async (resolve, reject) => {
    if (opts && opts.infuraId) {
      try {
        const wltlnk = new WalletLink({
          appName: opts.appName,
          appLogoUrl: opts.appLogoUrl
        })
        
        const provider = wltlnk.makeWeb3Provider(
          `https://mainnet.infura.io/v3/${opts.infuraId}`, 1
        )
        await provider.enable();
        return resolve(provider);
      } catch (error) {
        return reject(new Error("Failed to login to WalletLink"));
      }
    } else {
      return reject(new Error("Missing WalletLink Infura Id"));
    }
  });
};

export default ConnectToWalletLink;
